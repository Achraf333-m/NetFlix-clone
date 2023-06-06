import { Movie } from "@/typings";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";

interface props {
  movies: Movie[];
  title: string;
}

function Row({ movies, title }: props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [hasMoved, setHasMoved] = useState(false);

  const movingRow = (direction: string) => {
      if (rowRef.current) {
          const { scrollLeft, clientWidth } = rowRef.current;
          if(clientWidth === scrollLeft) {
              setHasMoved(false);
          }
          else {
            setHasMoved(true)
          }

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;


          rowRef.current?.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="row">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] hover:text-white transition duration-200 md:text-2xl">
        {title}
      </h2>
      <div  className="group relative md:-ml-2">
        <BsChevronLeft
          className={`arrowRow left-2 ${!hasMoved && "hidden"}`}
          onClick={() => movingRow("left")}
        />
        <div ref={rowRef} className="flex overflow-x-scroll space-x-0.5 scrollbar-hide items-center md:space-x-2.5 md:p-2">
          {movies?.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <BsChevronRight
          className="arrowRow right-2"
          onClick={() => movingRow("right")}
        />
      </div>
    </div>
  );
}

export default Row;
