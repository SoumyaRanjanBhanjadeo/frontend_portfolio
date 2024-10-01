import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

const Projects = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);

  const { projects } = portfolioData;
  return (
    <div>
      <SectionTitle title="Projects" />

      <div className="flex py-10 gap-20 sm:flex-col">
        <div className="flex flex-col gap-10 w-[80%] sm:flex-row sm:overflow-x-scroll sm:w-full">
          {projects.map((project, index) => (
            <div
              onClick={() => {
                setSelectedItemIndex(index);
              }}
              className="cursor-pointer"
              key={index}
            >
              <h1
                className={`text-xl px-10 ${selectedItemIndex === index
                  ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3"
                  : "text-white"
                  } `}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-10 sm:flex-col">
          <img src={projects[selectedItemIndex].image} alt=" project image" className='h-60 w-72' />
          <div className="flex flex-col gap-5">
            <Link to={`${projects[selectedItemIndex].link}`}>
              <h1 className="text-secondary text-xl">{projects[selectedItemIndex].title}</h1>
            </Link>
            <p className="text-white">{projects[selectedItemIndex].description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
