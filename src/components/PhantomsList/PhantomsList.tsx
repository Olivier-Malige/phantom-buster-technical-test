import { PhantomCard } from '../PhantomCard';

const PhantomsList = () => {
  return (
    <div className="flex flex-col gap-4">
      <PhantomCard />
      <PhantomCard />
      <PhantomCard />
    </div>
  );
};

export { PhantomsList };
