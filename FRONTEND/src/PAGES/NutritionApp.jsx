import React, { useState, useEffect } from 'react';
import { NutritionProfile } from '../NutritionProfile.js';
import  Button from '../components/Button.jsx';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, RefreshCw } from 'lucide-react';

import NutritionInputForm from '../components/nutrition/NutritionInputForm';
import NutritionFactsLabel from '../components/nutrition/NutritionFactsLabel';
import SavedProfiles from '../components/nutrition/SavedProfiles';

export default function NutritionApp() {
	const [currentProfile, setCurrentProfile] = useState(null);
	const [savedProfiles, setSavedProfiles] = useState([]);
	const [selectedProfile, setSelectedProfile] = useState(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		loadProfiles();
	}, []);

	const loadProfiles = async () => {
		setIsLoading(true);
		try {
			const profiles = await NutritionProfile.list('-created_date');
			setSavedProfiles(profiles);
		} catch (error) {
			console.error('Error loading profiles:', error);
		}
		setIsLoading(false);
	};

	const handleProfileUpdate = (profile) => {
		setCurrentProfile(profile);
	};

	const handleSaveProfile = async (profile) => {
		try {
			const savedProfile = await NutritionProfile.create(profile);
			setSavedProfiles(prev => [savedProfile, ...prev]);
			setSelectedProfile(savedProfile);
			setCurrentProfile(savedProfile);
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 3000);
		} catch (error) {
			console.error('Error saving profile:', error);
		}
	};

	const handleSelectProfile = (profile) => {
		setSelectedProfile(profile);
		setCurrentProfile(profile);
	};

	const handleDeleteProfile = async (profileId) => {
		try {
			await NutritionProfile.delete(profileId);
			setSavedProfiles(prev => prev.filter(p => p.id !== profileId));
			if (selectedProfile?.id === profileId) {
				setSelectedProfile(null);
				setCurrentProfile(null);
			}
		} catch (error) {
			console.error('Error deleting profile:', error);
		}
	};

	const handleNewProfile = () => {
		setSelectedProfile(null);
		setCurrentProfile(null);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-800 mb-4">
						Nutrition Facts Generator
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Create professional nutrition labels with accurate % Daily Value calculations
					</p>
				</div>

				{/* Success Alert */}
				{showSuccess && (
					<Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
						<CheckCircle className="h-4 w-4" />
						<AlertDescription>
							Nutrition profile saved successfully!
						</AlertDescription>
					</Alert>
				)}

				{/* Main Content */}
				<div className="grid lg:grid-cols-12 gap-8">
					{/* Left Column - Input Form */}
					<div className="lg:col-span-7 space-y-6">
						<div className="flex justify-between items-center">
							<h2 className="text-xl font-semibold text-gray-800">
								{selectedProfile ? 'Editing: ' + selectedProfile.name : 'Create New Profile'}
							</h2>
							{selectedProfile && (
								<Button
									onClick={handleNewProfile}
									variant="outline"
									className="flex items-center gap-2"
								>
									<RefreshCw className="w-4 h-4" />
									New Profile
								</Button>
							)}
						</div>

						<NutritionInputForm
							onProfileUpdate={handleProfileUpdate}
							onSave={handleSaveProfile}
							initialData={selectedProfile}
						/>

						<SavedProfiles
							profiles={savedProfiles}
							onSelect={handleSelectProfile}
							onDelete={handleDeleteProfile}
							selectedProfile={selectedProfile}
						/>
					</div>

					{/* Right Column - Nutrition Facts Label */}
					<div className="lg:col-span-5">
						<div className="sticky top-8">
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								Nutrition Facts Preview
							</h2>
							<div className="flex justify-center">
								<NutritionFactsLabel profile={currentProfile} />
							</div>

							{currentProfile && (
								<div className="mt-6 p-4 bg-blue-50 rounded-lg">
									<h3 className="font-semibold text-blue-800 mb-2">Quick Summary</h3>
									<div className="text-sm text-blue-700 space-y-1">
										<p><strong>Calories:</strong> {currentProfile.calories || 0}</p>
										<p><strong>Macros:</strong> {currentProfile.protein || 0}g protein, {currentProfile.total_carbohydrates || 0}g carbs, {currentProfile.total_fat || 0}g fat</p>
										<p><strong>Sodium:</strong> {currentProfile.sodium || 0}mg</p>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}