import Link from "next/link"
export default function Home(){
    return(
        <div className="w-screen h-screen bg-white flex flex-col items-center justify-center">
            <h1 className="text-black text-4xl">Bienvenido a Doc Type!</h1>
            <Link href="/doctor" className="text-white my-6 bg-primary p-4 rounded-lg">Buscador para doctores</Link>
            <Link href="/patient" className="text-white bg-primary p-4 rounded-lg">Buscador para pacientes</Link>

        </div>
    )
}