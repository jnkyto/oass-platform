import { Box, Divider, Flex, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

export function Footer() {
  const { t } = useTranslation();
  const { colorMode } = useColorMode();
  const backgroundColor = colorMode !== "light" ? "white" : "gray.800";
  const textColor = colorMode !== "light" ? "black" : "gray.300";

  return (
    <footer>
      <Box bg={backgroundColor}>
        <Divider />
        <Box
          display="flex"
          flexDirection={["column", "row"]}
          justifyContent="space-between"
          alignItems="center"
          gap="6"
          p="8"
          pb={["14", "8"]}
          w="full"
          mx="auto"
          maxWidth="7xl"
        >
          <Flex alignItems="center">
            <Box pr="2">
              <Link href="/" aria-label="Home">
                <Image src="/images/logos/logo_mono.webp" width="52" height="52" alt="logo" />
              </Link>
            </Box>

            <Box>
              <Text fontSize="md" fontWeight="bold" color={textColor}>
                {t("title")}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {t("conversational")}
              </Text>
            </Box>
          </Flex>

          <nav>
            <Box display="flex" flexDirection={["column", "row"]} gap={["6", "14"]} fontSize="sm">
              <Flex direction="column" alignItems={["center", "start"]}>
                <Text fontWeight="bold" color={textColor}>
                  {t("legal")}
                </Text>
                <FooterLink href="/privacy-policy" label={t("privacy_policy")} />
                <FooterLink href="/terms-of-service" label={t("terms_of_service")} />
              </Flex>
              <Flex direction="column" alignItems={["center", "start"]}>
                <Text fontWeight="bold" color={textColor}>
                  {"Tietoa meistä"}
                </Text>
                <FooterLink href="https://turkunlp.org" label={"TurkuNLP.org"} />
                <FooterLink href="https://huggingface.co/TurkuNLP" label={t("hugging_face")} />
                <FooterLink href="https://turkunlp.org/people.html" label={"Ketä on TurkuNLP?"} />
              </Flex>
              <Flex direction="column" alignItems={["center", "start"]}>
                <Text fontWeight="bold" color={textColor}>
                  {"Ohjeistus"}
                </Text>
                <FooterLink href="https://github.com/TurkuNLP/Open-Assistant/wiki" label={"Dokumentaatio"} />
                <FooterLink
                  href="https://github.com/TurkuNLP/Open-Assistant/wiki/Usein-Kysytyt-Kysymykset"
                  label={"Usein kysytyt kysymykset"}
                />
              </Flex>
            </Box>
          </nav>
        </Box>
      </Box>
    </footer>
  );
}

const FooterLink = ({ href, label }: { href: string; label: string }) =>
  useMemo(
    () => (
      <Link href={href} rel="noopener noreferrer nofollow" target="_blank" aria-label={label}>
        <Text color="blue.500" textUnderlineOffset={2} _hover={{ textDecoration: "underline" }}>
          {label}
        </Text>
      </Link>
    ),
    [href, label]
  );
