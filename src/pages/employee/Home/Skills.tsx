import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Skills = () => {
  const [skill, setSkill] = useState<string>("");
  const [rate, setRate] = useState<string>("");
  const [skillArray, setSkillArray] = useState<
    { skill: string; rate: string }[]
  >([]);

  const handleAdd = (): void => {
    if (skill && rate) {
      setSkillArray((prev) => [
        ...prev,
        {
          skill: skill,
          rate: rate,
        },
      ]);
      setSkill("");
      setRate("");
    } else {
      alert("Please fill out both the skill and rate.");
    }
  };

  const handleDelete = (index: number): void => {
    setSkillArray((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("Skill Array:", skillArray);
  }, [skillArray]);

  return (
    <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:content-['Skills'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:absolute before:-top-14">
      <CardContent >
        <div className=" bg-[#FBFFF2] rounded-2xl my-10 px-5 py-5">
          {/* Displaying the list of skills */}
          <div className="mt-5">
            {skillArray.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 rounded-xl mb-2"
              >
                <div className="w-20">
                  <strong>{item.skill}</strong>
                </div>
                <div className="flex gap-5">
                  {/* Beginner Circle */}
                  <div
                    className={`w-4 h-4 rounded-full ${
                      item.rate === "Beginner" ? "bg-[#D7FF7B]" : "bg-gray-400"
                    }`}
                  ></div>
                  <div>Beginner</div>

                  {/* Advanced Circle */}
                  <div
                    className={`w-4 h-4 rounded-full ${
                      item.rate === "Advanced" ? "bg-[#D7FF7B]" : "bg-gray-400"
                    }`}
                  ></div>
                  <div>Advanced</div>

                  {/* Expert Circle */}
                  <div
                    className={`w-4 h-4 rounded-full ${
                      item.rate === "Expert" ? "bg-[#D7FF7B]" : "bg-gray-400"
                    }`}
                  ></div>
                  <div>Expert</div>
                </div>
                <Trash2
                  className=" cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))}
          </div>

          {/* Add Skill Input and Rating */}
          <div className="flex gap-3 mt-4">
            <input
              type="text"
              placeholder="Add skill here"
              className="p-1 rounded-xl  bg-[#FBFFF2]  "
              onChange={(e) => setSkill(e.target.value)}
              value={skill}
            />
            <div className="flex gap-6 font-montserrat text-[14px]">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="beginner"
                  name="skill"
                  value="Beginner"
                  onChange={(e) => setRate(e.target.value)}
                  className="ml-2"
                  checked={rate === "Beginner"}
                />
                <label htmlFor="beginner">Beginner</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="advanced"
                  name="skill"
                  value="Advanced"
                  onChange={(e) => setRate(e.target.value)}
                  className="ml-2"
                  checked={rate === "Advanced"}
                />
                <label htmlFor="advanced">Advanced</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="expert"
                  name="skill"
                  value="Expert"
                  onChange={(e) => setRate(e.target.value)}
                  className="ml-2"
                  checked={rate === "Expert"}
                />
                <label htmlFor="expert">Expert</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 mt-4">
          <button
            className="bg-black py-1 px-5 text-white rounded-2xl font-semibold"
            onClick={handleAdd}
          >
            Add
          </button>
          <button className="bg-[#DDFF8F] py-1 px-5 text-black rounded-2xl font-semibold">
            Save
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;
