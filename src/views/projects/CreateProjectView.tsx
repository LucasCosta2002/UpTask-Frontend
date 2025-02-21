import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "../../types";
import { createProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function CreateProjectView() {

    const navigate = useNavigate();

    const initialValues : ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }

    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})

    const mutation = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            navigate("/")
        }
    });

    const handleForm = (formData : ProjectFormData) => {
        //mutate es async internamente
        mutation.mutate(formData)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

                <nav className="my-5">
                    <Link
                        to={"/"}
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white cursor-pointer font-bold text-xl transition-colors">
                        Volver Proyectos
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-white shadow-lg p-10 rounded-lg"
                    noValidate
                    onSubmit={handleSubmit(handleForm)}
                >
                    <ProjectForm
                        register={register}
                        errors={errors}
                    />
                    <input
                        type="submit"
                        value="Crear Proyecto"
                        className="bg-fuchsia-600 w-full p-3 font-bold text-white uppercase hover:bg-fuchsia-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    )
}
