import AiModelList from "@/shared/AiModelList";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Lock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import { useUser } from "@clerk/nextjs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

function AiMultiModels() {
  const {user} = useUser();
  const [aiModelList, setAiModelList] = useState(AiModelList);
  const { aiSelectedModels, setAiSelectedModels } = useContext(AiSelectedModelContext)

  const onToggleChange = (model, value) => {
    setAiModelList((prev) =>
      prev.map((m) => (m.model === model ? { ...m, enable: value } : m))
    );
  };
  const onSelecteValue = async (parentModel, value) => {
    setAiSelectedModels(prev => ({
      ...prev,
      [parentModel]: {
        modelId: value
      }
    }))
    //Update to Firebase Database
    const docRef= doc(db, "users", user?.primaryEmailAddress?.emailAddress)
    await updateDoc(docRef, {
      selectedModelPref: aiSelectedModels
    })
  }
  return (
    <div className="flex flex-1 h-[75vh] border-b">
      {aiModelList.map((model, index) => (
        <div
          className={`flex flex-col border-r h-full overflow-auto 
        ${model.enable ? "flex-1 min-w-[400px]" : "w-[100px] flex-none"}`}
        >
          <div
            key={index}
            className="flex w-full h-[70px] items-center justify-between border-b p-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={model.icon}
                alt={model.model}
                width={24}
                height={24}
              />

              {model.enable && (
                <Select defaultValue = {aiSelectedModels[model.model].modelId} onValueChange={(value) => onSelecteValue(model.model, value)} disabled={model.premium}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={aiSelectedModels[model.model].modelId} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="px-3">
                      <SelectLabel>Free</SelectLabel>
                    {model.subModel.map((subModel, i) => subModel.premium== false &&(
                      <SelectItem key={i} value={subModel.id}>
                        {subModel.name}
                      </SelectItem>
                    ))}
                    </SelectGroup>
                    <SelectGroup className="px-3">
                      <SelectLabel>Premium</SelectLabel>
                    {model.subModel.map((subModel, i) => subModel.premium== true &&(
                      <SelectItem key={i} value={subModel.name} disabled={subModel.premium}>
                        {subModel.name} {subModel.premium && <Lock className="h-4 w-4" />}
                      </SelectItem>
                    ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              {model.enable ? (
                <Switch
                  checked={model.enable}
                  onCheckedChange={(v) => onToggleChange(model.model, v)}
                />
              ) : (
                <MessageSquare
                  onClick={() => onToggleChange(model.model, true)}
                />
              )}
            </div>
          </div>
          {model.premium && model.enable && <div className="flex items-center justify-center h-full">
            <Button><Lock />Upgrade to Unlock!</Button>
          </div>}
        </div>
      ))}
    </div>
  );
}

export default AiMultiModels;
