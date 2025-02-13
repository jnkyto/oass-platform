import { Box, CircularProgress, Flex, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useTranslation } from "next-i18next";
import React, { useMemo } from "react";
import { useHasAnyRole } from "src/hooks/auth/useHasAnyRole";
import { LeaderboardEntity, LeaderboardReply, LeaderboardTimeFrame } from "src/types/Leaderboard";

import { DataTable, DataTableColumnDef } from "../DataTable/DataTable";
import { createJsonExpandRowModel } from "../DataTable/jsonExpandRowModel";
import { UserDisplayNameCell } from "../UserDisplayNameCell";
import { useBoardPagination } from "./useBoardPagination";
import { useBoardRowProps } from "./useBoardRowProps";
import { useFetchBoard } from "./useFetchBoard";

type WindowLeaderboardEntity = LeaderboardEntity & { isSpaceRow?: boolean };

const columnHelper = createColumnHelper<WindowLeaderboardEntity>();
const jsonExpandRowModel = createJsonExpandRowModel<WindowLeaderboardEntity>();
const streakDayThreshold = 2;

const GetTopUserMonthly = () => {
  let topUser = "";

  const {
    data: reply,
    isLoading,
    error,
    lastUpdated,
  } = useFetchBoard<LeaderboardReply & { user_stats_window?: LeaderboardReply["leaderboard"] }>(
    `/api/leaderboard?time_frame=month&limit=1&includeUserStats=false`
  );

  if (reply) {
    if (reply.leaderboard[0]) {
      topUser += `${reply.leaderboard[0].user_id}`;
    }
  }

  return topUser;
};

/**
 * Presents a grid of leaderboard entries with more detailed information.
 */
export const LeaderboardTable = ({
  timeFrame,
  limit: limit,
  rowPerPage,
  hideCurrentUserRanking,
}: {
  timeFrame: LeaderboardTimeFrame;
  limit: number;
  rowPerPage: number;
  hideCurrentUserRanking?: boolean;
}) => {
  const { t } = useTranslation("leaderboard");

  const {
    data: reply,
    isLoading,
    error,
    lastUpdated,
  } = useFetchBoard<LeaderboardReply & { user_stats_window?: LeaderboardReply["leaderboard"] }>(
    `/api/leaderboard?time_frame=${timeFrame}&limit=${limit}&includeUserStats=${!hideCurrentUserRanking}`
  );

  const isAdminOrMod = useHasAnyRole(["admin", "moderator"]);

  const columns: DataTableColumnDef<WindowLeaderboardEntity>[] = useMemo(
    () => [
      {
        ...columnHelper.accessor("rank", {
          header: t("rank"),
          cell: (ctx) =>
            ctx.row.original.isSpaceRow ? (
              <SpaceRow></SpaceRow>
            ) : isAdminOrMod ? (
              jsonExpandRowModel.renderCell(ctx)
            ) : (
              ctx.getValue()
            ),
        }),
        span: (cell) => (cell.row.original.isSpaceRow ? 6 : jsonExpandRowModel.span(cell)),
      },
      columnHelper.accessor("display_name", {
        header: t("user"),
        cell: ({ getValue, row }) => {
          const user = row.original;
          return (
            <UserDisplayNameCell
              authMethod={""} // no one cares about the auth method
              displayName={getValue()}
              userId={user.user_id}
              avatarUrl={user.image}
            ></UserDisplayNameCell>
          );
        },
      }),
      columnHelper.accessor("user_id", {
        id: "badges",
        header: t("badges"),
        meta: {
          cellProps: (x) => {
            return { style: { fontWeight: "bold" } };
          },
        },
        cell: ({ getValue, row }) => {
          const badges = {};
          const topUser: string = GetTopUserMonthly();
          type BadgeKey = "top_month" | "streak";

          const user = row.original;

          // Check if user is top scorer of the month
          if (topUser === user.user_id) {
            badges["top_month"] = "🏆";
          }

          // Check user streak
          const isOnStreak = user.streak_days >= streakDayThreshold;
          if (isOnStreak) {
            badges["streak"] = `🔥${user.streak_days + 1}`;
          }

          // Create elements containing badges along with tooltips
          const elements = (Object.keys(badges) as BadgeKey[]).map((key: BadgeKey) => (
            <div key={key} style={{ display: "inline", paddingRight: 7 }}>
              <Tooltip label={t(`${key}`) /* <- idk why this shows an error */}>{badges[key]}</Tooltip>
            </div>
          ));

          return <>{elements}</>;
        },
      }) /*
      columnHelper.accessor("user_id", {
        id: "badges",
        header: t("badges"),
        meta: {
          cellProps: (x) => {
            return { style: { fontWeight: "bold" } }
          }
        },
        cell: ({ getValue, row }) => {
          let badges:String[] = []

          const user = row.original;
          const isOnStreak = user.streak_days >= streakDayTreshold;
          const streakString = isOnStreak ? ("🔥" + String(user.streak_days + 1) ) : ( "" )
          badges.push(streakString)

          return (
            badges
          );
      }}),*/,
      columnHelper.accessor("leader_score", {
        header: t("score"),
      }),
      columnHelper.accessor("prompts", {
        header: t("prompt"),
      }),
      columnHelper.accessor((row) => row.replies_assistant + row.replies_prompter, {
        header: t("reply"),
      }),
      columnHelper.accessor((row) => row.labels_full + row.labels_simple, {
        header: t("label"),
      }),
    ],
    [isAdminOrMod, t]
  );

  const {
    data: paginatedData,
    end,
    ...pagnationProps
  } = useBoardPagination({ rowPerPage, data: jsonExpandRowModel.toExpandable(reply?.leaderboard || []), limit });
  const data = useMemo(() => {
    if (hideCurrentUserRanking || !reply?.user_stats_window || reply.user_stats_window.length === 0) {
      return paginatedData;
    }
    const userStatsWindow: WindowLeaderboardEntity[] = jsonExpandRowModel.toExpandable(reply.user_stats_window);
    const userStats = userStatsWindow.find((stats) => stats.highlighted);
    if (userStats && userStats.rank > end) {
      paginatedData.push(
        { isSpaceRow: true } as WindowLeaderboardEntity,
        ...userStatsWindow.filter(
          (stats) => paginatedData.findIndex((leaderBoardEntity) => leaderBoardEntity.user_id === stats.user_id) === -1
        ) // filter to avoid duplicated row
      );
    }
    return paginatedData;
  }, [hideCurrentUserRanking, reply?.user_stats_window, end, paginatedData]);

  const rowProps = useBoardRowProps<WindowLeaderboardEntity>();

  if (isLoading) {
    return <CircularProgress isIndeterminate />;
  }

  if (error) {
    return <span>Tulostaulukon lataaminen epäonnistui</span>;
  }

  return (
    <DataTable<WindowLeaderboardEntity>
      data={data}
      columns={columns}
      caption={lastUpdated}
      rowProps={rowProps}
      getSubRows={jsonExpandRowModel.getSubRows}
      {...pagnationProps}
    />
  );
};

const SpaceRow = () => {
  const color = useColorModeValue("gray.600", "gray.400");
  return (
    <Flex justify="center">
      <Box as={MoreHorizontal} color={color} />
    </Flex>
  );
};
