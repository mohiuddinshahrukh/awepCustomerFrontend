import {
  createStyles,
  ThemeIcon,
  Text,
  SimpleGrid,
  Box,
  Stack,
} from "@mantine/core";
import {
  IconSun,
  IconPhone,
  IconMapPin,
  IconAt,
  IconUser,
} from "@tabler/icons";

const useStyles = createStyles((theme, { variant }) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage:
      variant === "gradient"
        ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
            theme.colors[theme.primaryColor][6]
          } 100%)`
        : "none",
    backgroundColor: "transparent",
  },

  title: {
    color:
      variant === "gradient"
        ? theme.colors.gray[6]
        : theme.colors[theme.primaryColor][0],
  },

  description: {
    color: variant === "gradient" ? theme.black : theme.white,
    wordBreak: "break-word",
    whiteSpace: "normal",
  },
}));

function ContactIcon({
  icon: Icon,
  title,
  description,
  email,
  variant = "gradient",
  className,
  ...others
}) {
  const { classes, cx } = useStyles({ variant });
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      {variant === "gradient" ? (
        <ThemeIcon size={40} radius="md" className={classes.icon}>
          <Icon size={24} />
        </ThemeIcon>
      ) : (
        <Box mr="md">
          <Icon size={24} />
        </Box>
      )}

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
        {email && <Text className={classes.description}>{email}</Text>}
      </div>
    </div>
  );
}

const MOCKDATA = [
  {
    title: "Ali Hassan Zaidi",
    description: "+923215379133",
    icon: IconUser,
    email: "mohiuddinshahrukh@gmail.com",
  },
  {
    title: "Shahrukh Mohiuddin",
    description: "+923368811125",
    icon: IconUser,
    email: "mohiuddinshahrukh@gmail.com",
  },
  {
    title: "Muhammad Talha",
    description: "+923315333765",
    icon: IconUser,
    email: "mohiuddinshahrukh@gmail.com",
  },
  {
    title: "Tehseen Riaz Abbasi",
    description: "+923455893337",
    icon: IconUser,
    email: "mohiuddinshahrukh@gmail.com",
  },

  { title: "Address", description: "COMSATS University ISB", icon: IconMapPin },
  { title: "Working hours", description: "24/7 available", icon: IconSun },
  {
    title: "Team AWEP SAT",
    description: "automatedweddingeventplanner@gmail.com",
    icon: IconAt,
  },
];

export function ContactIconsList({ data = MOCKDATA, variant }) {
  const items = data.map((item, index) => (
    <ContactIcon key={index} variant={variant} {...item} />
  ));
  return <Stack spacing="xs">{items}</Stack>;
}

export function ContactIcons() {
  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 755, cols: 1 }]}>
      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundColor: theme.white,
        })}
      >
        <ContactIconsList />
      </Box>

      <Box
        sx={(theme) => ({
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          backgroundImage: `linear-gradient(135deg, ${
            theme.colors[theme.primaryColor][6]
          } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
        })}
      >
        <ContactIconsList variant="white" />
      </Box>
    </SimpleGrid>
  );
}
