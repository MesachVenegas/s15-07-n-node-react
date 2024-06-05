import Card from "@/components/ui/card";

export default function Dashboard() {

  return (
		<section className="flex flex-col gap-6 w-full h-full border">
      <Card >
        Gráfico
      </Card>
      <Card className="min-h-80">
        Calendario
      </Card>
		</section>
	);
}