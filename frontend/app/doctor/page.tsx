"use client";
import { useState } from "react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import { useRef } from "react";
import test from "node:test";
const backend = process.env.NEXT_PUBLIC_API_URL;

interface IExpediente {
  evaluation: string;
  diagnostic: string;
  treatment: string;
  id: string;
}

export default function Doctor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [white, setWhite] = useState(true);
  const [responded, setResponded] = useState(false);
  const [resultados, setResultados] = useState([] as IExpediente[]);
  const [isLoadingResult, setIsLoadingResult] = useState(false);
  const currentQuery = useRef("");

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    const test_query = data.query.replaceAll(" ", "");
    if (test_query === currentQuery.current) {
      setResponded(true);
      setIsLoadingResult(false);
      return;
    }
    const url = `${backend}doctor`;
    setIsLoadingResult(true);
    axios
      .post(url, { query: data.query })
      .then((res) => {
        setResultados(res.data.results);
        currentQuery.current = data.query.replaceAll(" ", "");
        setResponded(true);
      })
      .finally(() => {
        setIsLoadingResult(false);
      });
  };

  return (
    <div
      className={`bg-white w-screen p-3 h-screen flex flex-col duration-300 ease-out transition-all items-center delay-500${
        !responded ? "  justify-center " : null
      }`}
    >
      {responded ? null : (
        <h1 className="text-black mb-5 font-bold text-4xl">Doc Type</h1>
      )}
      <form className="flex w-full max-w-3xl" onSubmit={handleSubmit(onsubmit)}>
        <textarea
          placeholder="Busca sintomas"
          {...register("query", { required: true })}
          onFocus={() => {
            setResponded(false);
          }}
          className={`px-6 py-2 bg-graysecondary placeholder:text-textgray rounded-2xl w-full font-nunito font-regular text-2xl text-black  duration-200 ease-out transition-all ${
            responded ? " mt-5 text-sm h-12 bg-background" : ""
          }`}
        ></textarea>
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
            <div
              className={`m-auto h-12 w-12 animate-spin rounded-full border-[5px] border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${
                white ? " border-black " : " border-white "
              }`}
            ></div>
          ) : (
            <>
              {white ? (
                <svg
                  width="50"
                  height="50"
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
                  width="50"
                  height="50"
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
      <Link
        href="/new"
        className={`bg-primary flex mt-5 py-3 px-8 space-x-2 rounded-3xl items-center duration-200 ease-out transition-all ${
          responded ? " hidden " : " block "
        }`}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5315 5.20833L12.5125 19.7917"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.20833 12.5H19.7917"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>CREAR NUEVO EXPEDIENTE</p>
      </Link>
      {resultados.length > 0 && responded
        ? resultados.map((result, index) => {
            return (
              <div
                className="flex flex-col items-center w-full max-w-3xl mt-12"
                key={index}
              >
                <div className="flex flex-col w-full max-w-3xl">
                  <h1 className="text-primary text-3xl font-extrabold mb-5">
                    Mejor coincidencia
                  </h1>
                  <div className="bg-background text-black p-4 rounded-2xl">
                    <h1 className="text-primary text-base font-bold">
                      EXPEDIENTE
                    </h1>
                    <section className="bg-greendiagnosis p-1 rounded-2xl text-white w-40 text-center my-3">
                      {result.diagnostic.toUpperCase()}
                    </section>
                    <h1 className="text-primary text-base font-bold">
                      EVALUACIÓN
                    </h1>
                    <p>{result.evaluation}</p>
                    <h1 className="text-primary text-base font-bold mt-3">
                      TRATAMIENTO
                    </h1>
                    <p>{result.treatment}</p>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
