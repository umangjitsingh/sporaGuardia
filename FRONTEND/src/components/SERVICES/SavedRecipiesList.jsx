
import  {Card} from '../ui/Card.jsx';
import { CardContent } from '../ui/CardContent.jsx';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import Badge from '../ui/Badge.jsx'

export default function SavedRecipesList({ recipes, onSelect, selectedId, isLoading }) {
	if (isLoading) {
		return (

			<Card>
				<CardContent className="p-6 text-center flex items-center justify-center">
					<Loader2 className="w-6 h-6 animate-spin text-gray-400" />
					<span className="ml-3 text-gray-500">Loading recipes...</span>
				</CardContent>
			</Card>
		);
	}

	if (recipes.length === 0) {
		return (
			<Card>
				<CardContent className="p-6 text-center text-gray-500">
					You haven't saved any recipes yet. Create one below to get started.
				</CardContent>
			</Card>
		);
	}




	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  pt-2 pb-12">
			{recipes.map(recipe => (
				<Card
					key={recipe.id}
					onClick={() => onSelect(recipe)}
					className={`cursor-pointer transition-all ${
						selectedId === recipe.id ? 'border-blue-500 ring-2 ring-blue-500' : 'hover:shadow-md'
					}`}
				>
					<CardContent className="p-4 flex items-center gap-4">

						<div className="flex w-full items-center justify-between overflow-hidden ">
							<p className="font-semibold text-gray-800 truncate">{recipe.name}</p>
								<p className="text-sm text-gray-500">{recipe.is_prebuilt ? 'Base Recipe' : format(new Date(recipe.created_date), 'MMM d, yyyy')}</p>
								{recipe.is_prebuilt && (
									<Badge variant="secondary" className="text-blue-600 bg-blue-50 px-1.5 py-0">
										<ShieldCheck className="w-3 h-3"/>
									</Badge>
								)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

