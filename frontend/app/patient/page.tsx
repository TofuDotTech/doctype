"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
const backend = process.env.NEXT_PUBLIC_API_URL;

interface IExpediente {
  content: string;
  diagnostic: string;
}

export default function Patient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [white, setWhite] = useState(true);
  const [responded, setResponded] = useState(false);
  const [resultados, setResultados] = useState([] as IExpediente[]);
  const [isLoadingResult, setIsLoadingResult] = useState(false);

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoadingResult(true);
    const url = `${backend}pacient?diagnostics=${data.query.replaceAll(
      " ",
      ","
    )}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setResultados(res.data.content);
      })
      .finally(() => {
        setIsLoadingResult(false);
        setResponded(true);
      });
  };

  return (
    <div
      className={`bg-white h-screen w-screen p-3 flex flex-col duration-300 ease-out transition-all items-center delay-500${
        !responded ? "  justify-center " : ""
      }`}
    >
      {responded ? null : (
        <h1 className="text-black mb-5 font-bold text-4xl">Doc Type</h1>
      )}
      <form className="flex w-full max-w-3xl" onSubmit={handleSubmit(onsubmit)}>
        <input
          type="text"
          placeholder="Busca diagnósticos"
          {...register("query")}
          onFocus={() => {
            setResponded(false);
          }}
          className={`px-6 py-2 bg-graysecondary placeholder:text-textgray rounded-2xl w-full font-nunito font-regular text-2xl text-black  duration-200 ease-out transition-all ${
            responded ? " mt-5 text-sm h-12 bg-background" : ""
          }`}
        ></input>
        <button
          className={`bg-graysecondary px-6 py-3 rounded-2xl hover:bg-primary duration-300 ease-out transition-all ml-5 ${
            responded ? " hidden" : " block"
          }`}
          onMouseEnter={() => {
            setWhite(false);
          }}
          onMouseLeave={() => {
            setWhite(true);
          }}
          type="submit"
        >
          {isLoadingResult ? (
            <div className={`m-auto h-12 w-12 animate-spin rounded-full border-[5px] border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${white?' border-black ':' border-white '}`}></div>
          ) : (
            <>
              {white ? (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.7499 25H6.24994"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M31.25 12.5L43.75 25L31.25 37.5"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M43.7499 25H6.24994"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M31.25 12.5L43.75 25L31.25 37.5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </>
          )}
        </button>
      </form>
      {resultados.length > 0 && responded
        ? resultados.map((result, index) => {
            return (
              <div
                className="flex flex-col items-center w-1/2 mt-12"
                key={index}
              >
                <div className="flex flex-col w-full">
                  <div className="bg-background text-black p-4 rounded-2xl">
                    <h1 className="text-primary text-lg font-bold">
                      {result.diagnostic.toUpperCase()}
                    </h1>
                    <p>{result.content}</p>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
