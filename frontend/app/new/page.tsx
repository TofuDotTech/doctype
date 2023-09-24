"use client";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

export default function New() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <main className="h-screen w-screen flex justify-center p-3 bg-white">
      <div className="flex flex-col w-full max-w-3xl">
        <div className="flex items-center w-full mb-6">
          <Link href="/doctor" className="ml-[-10px]">
            <svg
              width="50"
              height="50"
              viewBox="0 0 55 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30.9375 37.8125L20.625 27.5L30.9375 17.1875"
                stroke="#1C4D8C"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <h1 className="text-primary font-bold text-3xl">REGRESA</h1>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex flex-col w-full mb-10">
            <label className="text-primary ml-2 font-bold text-xl mb-3">
              EVALUACIÓN
            </label>
            <textarea
              {...register("evaluacion", { required: true })}
              className="bg-graysecondary px-2 py-2 placeholder:text-textgray rounded-2xl font-nunito font-regular text-lg text-black"
              placeholder="Anota la evaluación del paciente"
            ></textarea>
          </div>
          <div className="flex flex-col w-full mb-10">
            <label className="text-primary ml-2 font-bold text-xl mb-3">
              DIAGNOSTICO
            </label>
            <textarea
              {...register("diagnostico", { required: true })}
              className="bg-graysecondary px-2 py-2 placeholder:text-textgray rounded-2xl font-nunito font-regular text-lg text-black"
              placeholder="Anota cual fue el diagnostico del paciente"
            ></textarea>
          </div>
          <div className="flex flex-col w-full mb-10">
            <label className="text-primary ml-2 font-bold text-xl mb-3">
              TRATAMIENTO
            </label>
            <textarea
              {...register("tratamiento", { required: true })}
              className="bg-graysecondary px-2 py-2 placeholder:text-textgray rounded-2xl font-nunito font-regular text-lg text-black"
              placeholder="Anota de que manera fue tratado el padecimiento"
            ></textarea>
          </div>
          <button className="bg-primary text-white w-full py-4 rounded-xl text-lg font-bold">
            REGISTRAR EL EXPEDIENTE
          </button>
        </form>
      </div>
    </main>
  );
}
