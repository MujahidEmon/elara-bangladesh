import OrderTracking from "@/components/OrderTracking/OrderTracking";

export const metadata = {
  title: "Track Order",
  description: "Track your Elara Bangladesh order by order number.",
};

export default async function TrackOrderNumberPage({ params }) {
  const { orderNumber } = await params;

  return <OrderTracking initialOrderNumber={orderNumber} />;
}
