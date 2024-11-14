import { BiPlay, BiPlayCircle, BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";



export default function VideoCard({ title, thumbnail = "https://placehold.co/400", duration, views, date,onClick,src }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl dark:from-gray-800 dark:to-gray-900">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <img src={thumbnail} alt={title} className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-medium text-white">
          {duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold leading-tight text-gray-900 line-clamp-2 dark:text-white">{title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center space-x-2">
            <BiUser className="h-4 w-4" />
            <span className="font-medium">Mukesh</span>
          </div>
          <div className="flex items-center space-x-2">
            <BsClock className="h-4 w-4" />
            <span>{date}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm font-medium text-purple-600 dark:text-purple-400">
            <BiPlay className="h-4 w-4" />
            <span>100K views</span>
          </div>
          <button onClick={onClick} className="rounded-full bg-purple-600 px-4 py-1 text-xs font-semibold text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  )
}