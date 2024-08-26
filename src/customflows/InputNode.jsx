import { useCallback, useState } from "react";
import { CustomHandle } from "./CustomHandle";

export function InputNode() {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const [input, setInput] = useState("");
    const onDropdownChange = useCallback((evt) => {
        console.log("Selected:", evt.target.value);
    }, []);

    return (
        <>
            <div className=" h-fit text-xs w-fit p-3 bg-blue-200 shadow-xl rounded-2xl">
                <label className="font-semibold text-sm" htmlFor="text">Node Label - </label>
                <input
                    className="bg-gray-200 p-1 rounded-xl border-black border-2 text-black"
                    id="text"
                    name="text"
                    onChange={onChange}
                />

                <label className="font-semibold text-xs mt-4 block" htmlFor="dropdown">Nodes- </label>
                <select
                    className="bg-gray-200 w-full p-1 rounded-xl border-black border-2 text-black mt-2"
                    id="dropdown"
                    name="dropdown"
                    onChange={onDropdownChange}
                >
                    <option value="option1">Select</option>
                    <option value="option2">Database</option>
                    <option value="option3">Socket</option>
                    <option value="option4">Dashboard</option>
                </select>
                <CustomHandle type={"target"} position={"bottom"} />
            </div>
        </>
    );
}
