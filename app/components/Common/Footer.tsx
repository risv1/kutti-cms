import React from "react";

const Footer: React.FC = () => {
  return (
    <section className="w-full p-5 bg-inherit">
      <div className="container mx-auto">
        <div className="flex flex-col justify-between items-center">
          <div>
            <p className="text-xl text-gray-500">
              Made by{" "}
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/risv1"
                className="text-primary"
              >
                @risv1
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
