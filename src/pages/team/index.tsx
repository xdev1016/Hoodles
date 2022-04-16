import React from "react";
import team from "./team";
import TeamMember from "./teammember";
import "./team.scss";
const Team = () => {
  return (
    <section id="team" className="team-container">
      <header className="team-header">
        <span className="vanish">MEET THE&nbsp;</span>TEAM
      </header>

      <div className="team-list-container">
        {team.map((mate, index) => {
          return (
            <TeamMember
              picture={mate.picture}
              name={mate.name}
              description={mate.description}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Team;
