// import {
//   Avatar,
//   Center,
//   createStyles,
//   Grid,
//   Group,
//   Paper,
//   RingProgress,
//   SimpleGrid,
//   Stack,
//   Text,
//   TypographyStylesProvider,
// } from "@mantine/core";
// import { useMediaQuery } from "@mantine/hooks";
// import React from "react";

// const ReviewBreakDown = ({}) => {
//   return (
//     <Grid>
//       <Grid.Col>
//         <Paper
//           style={{ borderBottom: "1px solid #eaeaea" }}
//           radius="md"
//           key={customerName}
//         >
//           <Group>
//             <Avatar src={customerImage} alt={customerName} size="xl" />
//             <div>
//               <Text size="lg">{customerName}</Text>
//               <Text size="md" color="dimmed">
//                 {postedAt}
//               </Text>
//               <Text size="md" color="dimmed">
//                 {customerEmail}
//               </Text>
//             </div>
//           </Group>
//           <TypographyStylesProvider className={classes.body}>
//             <div className={classes.content}>{review}</div>
//           </TypographyStylesProvider>
//           {feedback !== "" && (
//             <>
//               <Text weight="bold" pt="md">
//                 Feedback Reply from {venueName}
//               </Text>
//               <TypographyStylesProvider className={classes.body}>
//                 <div className={classes.content}>
//                   <p>{feedback}</p>
//                 </div>
//               </TypographyStylesProvider>
//             </>
//           )}
//           <Text weight="bold" pt="md">
//             Review Break Down
//           </Text>
//           <SimpleGrid cols={matches1400 ? 3 : matches1000 ? 2 : 1}>
//             {overallRating.map((rating, index) => {
//               return (
//                 <Paper withBorder radius="md" key={index}>
//                   <Group>
//                     <RingProgress
//                       size={80}
//                       roundCaps
//                       thickness={8}
//                       sections={[
//                         {
//                           value: rating.value * 20,
//                           color:
//                             rating.value > 4
//                               ? "green"
//                               : rating.value > 2
//                               ? "yellow"
//                               : "red",
//                         },
//                       ]}
//                       label={
//                         <Center>
//                           <Text weight={700} size="xl">
//                             {rating.value}
//                           </Text>
//                         </Center>
//                       }
//                     />

//                     <div>
//                       <Text size="md" transform="uppercase" weight={700}>
//                         {rating.label}
//                       </Text>
//                     </div>
//                   </Group>
//                 </Paper>
//               );
//             })}
//           </SimpleGrid>
//           <Text weight="bold" pt="md">
//             Booking Details
//           </Text>
//           {matches500 ? (
//             <>
//               <Group>
//                 <Text size="md">Venue Name: </Text>
//                 <Text size="md">{venueName}</Text>
//               </Group>
//               <Group>
//                 <Text size="md">Sub Venue Name:</Text>
//                 <Text size="md">{subVenue}</Text>
//               </Group>
//               <Group>
//                 <Text size="md">Booking Date:</Text>
//                 <Text size="md">{bookingDate.split("T")[0]}</Text>
//               </Group>
//               <Group>
//                 <Text size="md">Booking Time:</Text>
//                 <Text size="md">
//                   {bookingTime === "LUNCH"
//                     ? "Lunch (12:00 PM - 04:00 PM)"
//                     : "Dinner (07:00 PM - 10:00 PM)"}
//                 </Text>
//               </Group>
//             </>
//           ) : (
//             <>
//               <Stack spacing={0}>
//                 <Text size="md" weight={600}>
//                   Venue Name:
//                 </Text>
//                 <Text size="md">{venueName}</Text>
//               </Stack>
//               <Stack spacing={0}>
//                 <Text size="md" weight={600}>
//                   Sub Venue Name:
//                 </Text>
//                 <Text size="md">{subVenue}</Text>
//               </Stack>
//               <Stack spacing={0}>
//                 <Text size="md" weight={600}>
//                   Booking Date:
//                 </Text>
//                 <Text size="md">{bookingDate.split("T")[0]}</Text>
//               </Stack>
//               <Stack spacing={0}>
//                 <Text size="md" weight={600}>
//                   Booking Time:
//                 </Text>
//                 <Text size="md">
//                   {bookingTime === "LUNCH"
//                     ? "Lunch (12:00 PM - 04:00 PM)"
//                     : "Dinner (07:00 PM - 10:00 PM)"}
//                 </Text>
//               </Stack>
//             </>
//           )}
//         </Paper>
//       </Grid.Col>
//     </Grid>
//   );
// };

// export default ReviewBreakDown;
