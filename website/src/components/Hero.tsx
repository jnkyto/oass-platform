import { Box, Button, Text, useBreakpointValue, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useBrowserConfig } from "src/hooks/env/BrowserEnv";

import { AnimatedCircles } from "./AnimatedCircles";
import { Container } from "./Container";

export function Hero() {
  const { t } = useTranslation(["index", "common"]);
  const { ENABLE_CHAT } = useBrowserConfig();
  const { colorMode } = useColorMode();

  const dashboard_button_size = useBreakpointValue({ base: "4.5em", md: "200" }, { fallback: "200" });
  const other_button_size = useBreakpointValue({ base: "1em", lg: "2em" }, { fallback: "200" });

  const pTextColor = colorMode === "light" ? "text-gray-600" : "text-white";
  const fancyTextGradientClasses =
    colorMode === "light" ? "from-blue-600 via-sky-400 to-blue-700" : "from-blue-500 via-sky-300 to-blue-400";
  return (
    <Box className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container className="">
        <Box className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <Box className="relative mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <Text as="h1" className="text-5xl mb-6 font-bold tracking-tight">
              {t("common:title")}
            </Text>
            <Text
              as="h2"
              className={`bg-gradient-to-r ${fancyTextGradientClasses} font-bold mt-8 text-3xl inline bg-clip-text font-display tracking-tight text-transparent`}
            >
              {t("subtitle")}
            </Text>
            <Text className={`mt-6 text-lg ${pTextColor}`}>{t("blurb")}</Text>
            <Text className={`mt-6 text-lg ${pTextColor}`}>{t("blurb1")}</Text>
            <Text className={`mt-6 text-lg ${pTextColor}`}>
              Sivustomme pohjautuu avoimeen OpenAssistant-projektiin, mutta toimintamme ei muuten liity heihin.
            </Text>
            <Box className={`mt-6 flex gap-6 ${pTextColor} flex-wrap`}>
              {/* {ENABLE_CHAT && (
                <Link href="/chat" aria-label="Chat">
                  <Button variant="solid" colorScheme="blue" px={5} py={6}>
                    {t("index:try_our_assistant")}
                  </Button>
                </Link>
              )} */}
              <Link href="/dashboard" aria-label="Dashboard">
                <Button variant="outline" colorScheme="blue" fontSize="xl" px={dashboard_button_size} py={100}>
                  {t("index:help_us_improve")}
                </Button>
              </Link>
              <Link href="https://www.youtube.com/watch?v=FxngtUlL8RA" aria-label="Hugging face">
                <Button variant="solid" colorScheme="blue" px={other_button_size} py={6}>
                  {t("index:promo_video_button")}
                </Button>
              </Link>
              <Link href="https://turkunlp.org/" aria-label="Hugging face">
                <Button variant="solid" colorScheme="blue" px={other_button_size} py={6}>
                  {t("index:hugging_face_link")}
                </Button>
              </Link>
              <Link href="https://open-assistant.io/" aria-label="Open-Assistant">
                <Button variant="solid" colorScheme="blue" px={other_button_size} py={6}>
                  {t("index:open_assistant_link")}
                  {/* {t("index:open_assistant_link")} */}
                </Button>
              </Link>
            </Box>
          </Box>
          <Box className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <AnimatedCircles />
            <Box className="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_60%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <Image
                src="/images/logos/logo.webp"
                className="mx-auto mr-6 object-fill"
                width="450"
                height="450"
                alt={""}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
