import { Center, Pagination, SimpleGrid } from "@mantine/core";

import React, { useState } from "react";
import FeaturedVenuesCard from "../featuredVenuesSection/FeaturedVenuesCard";
import Paginating from "../Paginating/Paginating";

const AllVenuesVenueCard = ({ allVenues, time, date }) => {
  let venuesPerPage = 6;
  //write logic for Pagination

  let pages = Math.ceil(allVenues?.length / venuesPerPage);
  console.log("Pages", pages);
  const [totalCount, setTotalCount] = useState(pages);
  const [activePage, setPage] = useState(1);

  const indexOfLastVenue = activePage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = allVenues?.slice(indexOfFirstVenue, indexOfLastVenue);

  const venues = currentVenues?.map((venue, index) => {
    return (
      <FeaturedVenuesCard key={index} venue={venue} date={date} time={time} />
    );
  });

  return (
    <>
      <Center>
        <SimpleGrid
          // spacing={2}
          cols={3}
          breakpoints={[
            { maxWidth: 630, cols: 1 },
            { maxWidth: 1250, cols: 2 },
            // { minWidth: 1250, cols: 3 },
            // { minWidth: "lg", cols: 2 },
            // { minWidth: "xl", cols: 3 },
          ]}
        >
          {venues}
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

export default AllVenuesVenueCard;
