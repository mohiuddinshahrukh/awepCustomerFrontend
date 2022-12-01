import React from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";

const TopNavbarThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      className={dark ? "themeToggleDay" : "themeToggleNight"}
      size={43}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={25} /> : <IconMoonStars size={25} />}
    </ActionIcon>
  );
};

export default TopNavbarThemeToggle;
