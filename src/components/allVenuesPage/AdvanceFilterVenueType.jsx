import { Accordion, Checkbox } from "@mantine/core";
import React, { useState } from "react";

const AdvanceFilterVenueType = ({ accordionsData, setVenueType }) => {
  const accordionItems = accordionsData?.map((accordion, index) => {
    return (
      <Accordion key={index} defaultValue="">
        <Accordion.Item key={index} value={accordion.value}>
          <Accordion.Control>{accordion.title}</Accordion.Control>
          <Accordion.Panel>
            <Checkbox.Group
            // defaultValue={["react"]}
            >
              {accordion.venueTypes.map((type, index) => {
                return (
                  <Checkbox
                    key={index}
                    onChange={(event) =>
                      setVenueType(event.currentTarget.checked)
                    }
                    value={type.value}
                    label={type.label}
                  />
                );
              })}
            </Checkbox.Group>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  });
  return <div>{accordionItems}</div>;
};

export default AdvanceFilterVenueType;
