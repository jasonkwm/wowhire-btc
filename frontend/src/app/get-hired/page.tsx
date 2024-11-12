import JobDetails from "@/components/JobDetails";

export default function Page() {
  return (
    <JobDetails
      imageUrl="/wowhire.jpg"
      jobTitle="Cashier"
      company="Starbucks"
      location="92/4, Floor 2, Sathorn Thani 2 Building, North Sathorn Road, Si Lom, Bang Rak, Bangkok 10500"
      workDay="Wednesday"
      workHours="8am-12pm"
      requirements={["Making Coffee", "Talking to people", "Art on Latte"]}
      salary="500"
      description="If coffee is your canvas, and mornings don’t start without that perfect pour, you might be our next Barista Extraordinaire. We’re on the hunt for someone who can transform beans and water into magic and serve it up with just the right blend of charm and speed."
    />
  );
}
