import { addUserToProject } from "@/api/TeamAPI"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
	user: TeamMember,
	reset: () => void
}

export default function SearchResult({user, reset} : SearchResultProps) {
	const params = useParams();
	const projectId = params.projectId!;

	//permite manipular querys que traen datos
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
        mutationFn: addUserToProject,
		onError: (error) => {
			toast.error(error.message)
		},
		onSuccess: (data) =>{
			toast.success(data)
			reset()
			queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
		}
    })

	const handleAddUserToProject = () => {
		mutate({projectId, id: user._id})
	}

	return (
    	<>
			<p className="mt-10 text-center font-bold">Resultado:</p>

			<div className="flex justify-between">
				<p>{user.name}</p>
				<button
					onClick={handleAddUserToProject}
					className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
				>Agregar al proyecto</button>
			</div>
		</>
    )
}
