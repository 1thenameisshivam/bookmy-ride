/* eslint-disable react/prop-types */

import { cn } from "../lib/utils"; // utility function for classnames (ensure this path is correct)

function TiltedCover({
  children,
  direction = "left",
  tiltCover = true,
  cover,
  image,
  ...props // Include other HTML attributes
}) {
  const tiltLeft = direction === "left";
  const factor = tiltLeft ? 1 : -1;

  return (
    // The container has height and width set to the size of the content + padding.
    <div
      className="flex h-64 w-52 items-center justify-center overflow-hidden"
      {...props}
    >
      <div className="group relative h-52 w-40">
        {/* Background content */}
        <div
          className="border-box border-1 pointer-events-none relative h-full w-full overflow-hidden rounded-xl border bg-background transition-all duration-500 ease-slow group-hover:!transform-none dark:border-zinc-700"
          style={{
            transform: `perspective(400px) rotateY(${
              factor * 20
            }deg) scale(0.85) translateX(${-factor * 20}%)`,
          }}
        >
          {children}
          <div className="absolute inset-0 h-full w-full bg-gray-400/10 transition-all group-hover:bg-transparent" />
        </div>

        {/* Cover Content */}
        <div
          className={cn(
            "border-box pointer-events-none absolute inset-0 h-full w-full rounded-xl border-[6px] bg-white transition-all delay-75 duration-500 ease-slow group-hover:!transform-none group-hover:opacity-0 dark:bg-gray-800",
            {
              "group-hover:left-[200%]": tiltLeft,
              "group-hover:-left-[200%]": !tiltLeft,
            }
          )}
          style={{
            transform: tiltCover
              ? `perspective(400px) rotateY(${factor * 20}deg)`
              : undefined,
          }}
        >
          <div className="h-full w-full rounded-md object-cover">
            {image ? (
              // Using regular <img> tag for the image element
              <img
                src={image.src} // Ensure the image prop has a src
                alt={image.alt || "Cover Image"} // Ensure alt is provided or default it
                className={cn(
                  "h-full w-full rounded-md object-cover",
                  image?.className
                )}
              />
            ) : (
              cover // Fallback to cover content
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TiltedCover;
