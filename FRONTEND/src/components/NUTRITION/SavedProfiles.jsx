import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import  Button  from '../Button.jsx';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function SavedProfiles({ profiles, onSelect, onDelete, selectedProfile }) {
  if (!profiles || profiles.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <FileText className="w-5 h-5" />
            Saved Profiles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p>No saved profiles yet</p>
            <p className="text-sm">Create your first nutrition profile above</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-800">
            <FileText className="w-5 h-5" />
            Saved Profiles
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {profiles.length} saved
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedProfile?.id === profile.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onSelect(profile)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1">{profile.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(profile.created_date), 'MMM d, yyyy')}
                    </span>
                    <span>{profile.serving_size}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700">
                      {profile.calories || 0} cal
                    </Badge>
                    {profile.protein > 0 && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {profile.protein}g protein
                      </Badge>
                    )}
                    {profile.total_carbohydrates > 0 && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {profile.total_carbohydrates}g carbs
                      </Badge>
                    )}
                    {profile.total_fat > 0 && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        {profile.total_fat}g fat
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(profile.id);
                  }}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}