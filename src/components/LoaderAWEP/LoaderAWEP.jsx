import { Center, Image, Loader, LoadingOverlay, Paper } from "@mantine/core";
import React from "react";
import AWEPLoader from "../../assets/loader.gif";

const LoaderAWEP = ({ visible }) => {
  return (
    <LoadingOverlay
      style={{
        alignItems: "flex-start",
      }}
      loaderProps={{ size: "sm" }}
      loader={
        <div
          style={{
            paddingTop: "10%",
          }}
        >
          <Center>
            <Image
              style={{
                width: "20%",
                height: "20%",
              }}
              src={AWEPLoader}
            />
          </Center>
          <Center>
            <Loader size="xl" variant="dots" color="pink" />
          </Center>
        </div>
      }
      visible={visible}
      overlayOpacity={0.9}
    />
  );
};

export default LoaderAWEP;
