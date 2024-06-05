import { InstanceWithDetails } from "@/lib/prismaTypes";
import React from "react";

type InstanceDetailsProps = {
  instance: InstanceWithDetails;
};

export default function InstanceDetails({ instance }: InstanceDetailsProps) {
  return <div>InstanceDetails</div>;
}
