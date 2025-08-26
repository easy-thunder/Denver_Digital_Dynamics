"use client";

import { useState, useMemo } from "react";
import {skillsToDisplayFunction} from "@/lib/skills_with_description";
import SkillsBanner from "@/components/SkillsBanner/SkillsBanner";
import DescriptionCard from "@/components/Cards/DescriptionCard/DescriptionCard";
import Button from "@/components/ui/Button/Button";
import styles from "./Skills.module.css";

export default function Skills() {
  const allSkills = skillsToDisplayFunction();
  const [domainFilter, setDomainFilter] = useState("All");
  const [coreFilter, setCoreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Filter + sort logic
  const skills = useMemo(() => {
    let filtered = allSkills;

    if (domainFilter !== "All") {
      filtered = filtered.filter((s) => s.domain.includes(domainFilter));
    }
    if (coreFilter !== "All") {
      filtered = filtered.filter((s) => s.coreOrSupporting === coreFilter);
    }

    if (sortBy === "Newest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.acquisitionDate) - new Date(a.acquisitionDate)
      );
    }
    if (sortBy === "A-Z") {
      filtered = [...filtered].sort((a, b) =>
        a.skillName.localeCompare(b.skillName)
      );
    }

    return filtered;
  }, [allSkills, domainFilter, coreFilter, sortBy]);

  return (
    <main className={styles.skills}>
      <SkillsBanner title="Skills" subtitle="Filter and sort my stack across client, server, data, and analytics." />

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.filterRow}>
          <Button
            label="All"
            color={domainFilter === "All" ? "var(--color-accent)" : "var(--color-dark)"}
            onClick={() => setDomainFilter("All")}
          />
          <Button
            label="Client Side"
            color={domainFilter === "Client Side" ? "var(--color-accent)" : "var(--color-dark)"}
            onClick={() => setDomainFilter("Client Side")}
          />
          <Button
            label="Server Side"
            color={domainFilter === "Server Side" ? "var(--color-accent)" : "var(--color-dark)"}
            onClick={() => setDomainFilter("Server Side")}
          />
          <Button
            label="Data Engineering"
            color={domainFilter === "Data Engineering" ? "var(--color-accent)" : "var(--color-dark)"}
            onClick={() => setDomainFilter("Data Engineering")}
          />
          <Button
            label="Analytics"
            color={domainFilter === "Analytics" ? "var(--color-accent)" : "var(--color-dark)"}
            onClick={() => setDomainFilter("Analytics")}
          />
        </div>

        <div className={styles.filterRow}>
          <Button
            label="All"
            color={coreFilter === "All" ? "var(--color-accent)" : "var(--color-dark)"}
            onClick={() => setCoreFilter("All")}
          />
          <Button
            label="Core"
            color={coreFilter === "Core" ? "var(--color-accent)" : "var(--color-dark)"}
            onClick={() => setCoreFilter("Core")}
          />
          <Button
            label="Supporting"
            color={coreFilter === "Supporting" ? "var(--color-accent)" : "var(--color-dark)"}
            onClick={() => setCoreFilter("Supporting")}
          />
        </div>

        <div className={styles.sortRow}>
          <label>
            Sort:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option>Newest</option>
              <option>Oldest</option>
              <option>A-Z</option>
            </select>
          </label>
        </div>
      </div>

      {/* Skills Grid */}
      <div className={styles.grid}>
        {skills.map((skill) => (
          <DescriptionCard
            key={skill.skillName}
            title={skill.skillName}
            content={
              <div>
                <p className={styles.info}>{skill.information}</p>
                <p className={styles.meta}>
                  <strong>Domain:</strong> {skill.domain.join(", ")} <br />
                  <strong>Since:</strong> {skill.acquisitionDate}
                </p>
                {skill.tools?.length > 0 && (
                  <div className={styles.tools}>
                    {skill.tools.map((tool) => (
                      <span key={tool} className={styles.tool}>
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
                {skill.articles?.length > 0 && (
                  <p className={styles.articles}>
                    <strong>{skill.articleLabel}</strong>{" "}
                    {skill.articles.map((a) => (
                      <a key={a.href} href={a.href}>
                        {a.text}
                      </a>
                    ))}
                  </p>
                )}
              </div>
            }
          />
        ))}
      </div>
    </main>
  );
}
