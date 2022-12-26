import { Carousel } from "@mantine/carousel";
import { Center, Pagination, SimpleGrid } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeaturedVendorsCard from "../featuredVendorsSection/FeaturedVendorsCard";
import Paginating from "../Paginating/Paginating";
import AllVendorsVendorImagesCarousel from "./AllVendorsVendorImagesCarousel";

const AllVendorsVendorCard = ({ allVendors, time, date }) => {
  let vendorsPerPage = 6;
  //write logic for Pagination

  let pages = Math.ceil(allVendors?.length / vendorsPerPage);
  console.log("Pages", pages);
  const [totalCount, setTotalCount] = useState(pages);
  const [activePage, setPage] = useState(1);

  const indexOfLastVendor = activePage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = allVendors?.slice(
    indexOfFirstVendor,
    indexOfLastVendor
  );
  const vendors = currentVendors.map((vendor, index) => {
    return (
      <FeaturedVendorsCard
        key={index}
        vendor={vendor}
        date={date}
        time={time}
      />
    );
  });
  return (
    <>
      <Center>
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 630, cols: 1 },
            { maxWidth: 1250, cols: 2 },
            // { maxWidth: "xs", cols: 1 },
            // { maxWidth: "sm", cols: 2 },
            // { maxWidth: "md", cols: 3 },
            // { maxWidth: "lg", cols: 3 },
            // { maxWidth: "xl", cols: 3 },
          ]}
        >
          {vendors}
        </SimpleGrid>
      </Center>
      <Paginating
        pages={pages}
        activePage={activePage}
        totalCount={totalCount}
        setPage={setPage}
      />
    </>
  );
};

export default AllVendorsVendorCard;
