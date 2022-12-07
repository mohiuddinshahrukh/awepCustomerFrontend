import {
  Button,
  Card,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBuildingFortress,
  IconCash,
  IconStar,
  IconUsers,
  IconVideo,
} from "@tabler/icons";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCountUp } from "react-countup";
import { useIntersection } from "@mantine/hooks";
import CountUp from "react-countup";
const LandingPageStatsCards = ({ stat, entry, ref, containerRef }) => {
  const countUpRef = useRef(null);
  const { start, pauseResume, reset, update } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: 1234567,
    delay: 1000,
    duration: 5,
    onReset: () => console.log("Resetted!"),
    onUpdate: () => console.log("Updated!"),
    onPauseResume: () => console.log("Paused or resumed!"),
    onStart: ({ pauseResume }) => console.log(pauseResume),
    onEnd: ({ pauseResume }) => console.log(pauseResume),
  });

  const theme = useMantineTheme();
  const card = (
    <Card
      ref={ref}
      className="border"
      radius={"md"}
      sx={{
        borderRadius: "0.5rem",
        ":hover": {
          boxShadow: "0 5px 12px #0003",
        },
        boxShadow: "0 2px 8px #00000026",
        transition: "box-shadow .2s",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease",
        transitionDelay: "0s",
        transitionProperty: "box-shadow",
      }}
      component={Link}
      style={{ width: "302px" }}
    >
      <Card.Section style={{ height: "201px", position: "relative" }}>
        <Stack
          spacing={0}
          ref={ref}
          style={{ height: "100%", width: "100%" }}
          align={"center"}
          justify={"center"}
        >
          <Text weight={500} size={"xl"}>
            {stat.title}
          </Text>

          <CountUp
            className="fgColorF"
            style={{ fontSize: 90, fontWeight: 700, marginTop: 10 }}
            end={stat.value}
          />
        </Stack>
      </Card.Section>
    </Card>
  );

  return <div>{card}</div>;
};

export default LandingPageStatsCards;

// <Text> {venue.venueName}</Text>
// <Text>{venue?.subVenues?.length}</Text>
// <div ref={countUpRef} />
// <button onClick={start}>Start</button>
// <button onClick={reset}>Reset</button>
// <button onClick={pauseResume}>Pause/Resume</button>
// <button onClick={() => update(2000)}>Update to 2000</button>
// </Stack>
