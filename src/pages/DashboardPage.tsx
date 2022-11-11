const DashboardPage = () => {
  return (
    <section className="my-10">
      <div className="flex justify-center lg:justify-start">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>

      <div className="mt-9 flex flex-col lg:flex-row lg:gap-10">
        <div className="min-w-[250px]">categories</div>
        <div className="flex-1">phantoms</div>
      </div>
    </section>
  );
};

export { DashboardPage };
