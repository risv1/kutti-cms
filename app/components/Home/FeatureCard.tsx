import React from "react";

type FeatureCardProps = {
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = (props: {
  title: string;
  description: string;
}) => {
  return (
    <article className="w-fit h-fit p-5 rounded-xl flex gap-4 flex-col items-center bg-neutral-950 border border-neutral-900 ease-in-out duration-150 hover:cursor-pointer hover:border-primary">
      <h1 className="text-2xl font-bold text-white">{props.title}</h1>
      <p className="text-center text-gray-500">{props.description}</p>
    </article>
  );
};

export default FeatureCard;
