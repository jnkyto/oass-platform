import {
  Box,
  Card,
  CardBody,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBoolean,
} from "@chakra-ui/react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import React from "react";
export { getStaticProps } from "src/lib/defaultServerSideProps";
import { AdminArea } from "src/components/AdminArea";
import { AdminLayout } from "src/components/Layout";
import { TrollboardTable } from "src/components/LeaderboardTable/TrollboardTable";
import { TrollboardTimeFrame } from "src/types/Trollboard";

const Leaderboard = () => {
  const { t } = useTranslation(["leaderboard", "common"]);
  const [enabled, setEnabled] = useBoolean(true);

  return (
    <>
      <Head>
        <title>{`${t("common:trollboard")} - ${t("common:title")}`}</title>
        <meta name="description" content="Admin Trollboard" charSet="UTF-8" />
      </Head>
      <AdminArea>
        <Box display="flex" flexDirection="column">
          <Heading fontSize="2xl" fontWeight="bold" pb="4">
            Trollilauta
          </Heading>
          <Card>
            <CardBody>
              <RadioGroup defaultValue="1" onChange={setEnabled.toggle}>
                <Stack direction="row" spacing={5}>
                  <Radio value="1" colorScheme="green">
                    Näytä aktiiviset käyttäjät
                  </Radio>
                  <Radio value="2" colorScheme="red">
                    Näytä bannatut käyttäjät
                  </Radio>
                </Stack>
              </RadioGroup>
              <Tabs isFitted isLazy>
                <TabList mb={4}>
                  <Tab>{t("daily")}</Tab>
                  <Tab>{t("weekly")}</Tab>
                  <Tab>{t("monthly")}</Tab>
                  <Tab>{t("overall")}</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel p="0">
                    <TrollboardTable
                      timeFrame={TrollboardTimeFrame.day}
                      limit={100}
                      rowPerPage={20}
                      enabled={enabled}
                    />
                  </TabPanel>
                  <TabPanel p="0">
                    <TrollboardTable
                      timeFrame={TrollboardTimeFrame.week}
                      limit={100}
                      rowPerPage={20}
                      enabled={enabled}
                    />
                  </TabPanel>
                  <TabPanel p="0">
                    <TrollboardTable
                      timeFrame={TrollboardTimeFrame.month}
                      limit={100}
                      rowPerPage={20}
                      enabled={enabled}
                    />
                  </TabPanel>
                  <TabPanel p="0">
                    <TrollboardTable
                      timeFrame={TrollboardTimeFrame.total}
                      limit={100}
                      rowPerPage={20}
                      enabled={enabled}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </Box>
      </AdminArea>
    </>
  );
};

Leaderboard.getLayout = AdminLayout;

export default Leaderboard;
