
import  {Card} from '../ui/Card.jsx';
import { CardContent } from '../ui/CardContent.jsx';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

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
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{recipes.map(recipe => (
				<Card
					key={recipe.id}
					onClick={() => onSelect(recipe)}
					className={`cursor-pointer transition-all ${
						selectedId === recipe.id ? 'border-blue-500 ring-2 ring-blue-500' : 'hover:shadow-md'
					}`}
				>
					<CardContent className="p-4 flex items-center gap-4">
						{recipe.image_url ? (
							<img src={recipe.image_url} alt={recipe.name} className="w-16 h-16 rounded-md object-cover" />
						) : (
							<div className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center text-gray-400">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
							</div>
						)}
						<div className="flex-1">
							<p className="font-semibold text-gray-800 truncate">{recipe.name}</p>
							<p className="text-sm text-gray-500">{format(new Date(recipe.created_date), 'MMM d, yyyy')}</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}


