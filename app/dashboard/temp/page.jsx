"use client"

import { useForm } from "react-hook-form";
import { createSpace } from "@/actions/dashboard/action";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LocationSelector from "../../../components/spacecomp/LocationSelector.jsx"; 
import { useState } from "react";

export default function SpaceForm() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [location, setLocation] = useState(null);

  
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      about: "",
      price: 0,
      hostname: "",
      status: "",
      images: "",
      reviews: 0,
      categories: "",
      amenities: "",
      people: 0,
      comments: "",
      currency: "INR",
      address: "",
      city: "",
      state: "",
      country: "",
      timeings: "",
      lat: null,
      lng: null
    },
  });

  const onSubmit = async (data) => {
    try {
      await createSpace({
        ...data,
        images: data.images.split(","),
        categories: data.categories.split(","),
        amenities: data.amenities.split(","),
        comments: data.comments.split(","),
        timeings: data.timeings.split(","),
        lat: location?.lat || data.lat,
        lng: location?.lng || data.lng
      });
      reset();
      console.log("Data Sent");
    } catch (error) {
      console.error("Error creating space:", error);
    }
  };

  const openLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  const closeLocationModal = () => {
    setIsLocationModalOpen(false);
  };

  const handleLocationSelect = (lat, lng) => {
    setLocation({ lat, lng });
    setValue("lat", lat);
    setValue("lng", lng);
    closeLocationModal();
  };

  return (
    <>
      <Card className="w-full bg-white shadow-md rounded-lg p-6">
        <CardHeader>
          <CardTitle>Create New Space</CardTitle>
          <CardDescription>Fill in the details to list a space.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Information Fields */}
            <div className="grid grid-cols-2 gap-4">
              {["name", "about", "hostname", "status", "address", "city", "state", "country", "currency"].map((field) => (
                <div key={field} className="flex flex-col space-y-1.5">
                  <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <Input
                    id={field}
                    type="text"
                    placeholder={`Enter ${field}`}
                    {...register(field, { required: true })}
                  />
                </div>
              ))}
            </div>

            {/* Numeric Fields */}
            <div className="grid grid-cols-2 gap-4">
              {["price", "reviews", "people"].map((field) => (
                <div key={field} className="flex flex-col space-y-1.5">
                  <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <Input
                    id={field}
                    type="number"
                    placeholder={`Enter ${field}`}
                    {...register(field, { required: true, valueAsNumber: true })}
                  />
                </div>
              ))}
            </div>

            {/* Comma-separated Fields */}
            {["images", "categories", "amenities", "comments", "timeings"].map((field) => (
              <div key={field} className="flex flex-col space-y-1.5">
                <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)} (comma separated)</Label>
                <Input id={field} type="text" placeholder={`Enter ${field} separated by commas`} {...register(field)} />
              </div>
            ))}

            {/* Location Selection */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <div className="flex items-center">
                <Input
                  id="location"
                  type="text"
                  value={location ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` : ""}
                  disabled
                  placeholder="Select a location"
                  className="mr-4"
                />
                <Button type="button" onClick={openLocationModal}>Select Location</Button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white">Create Space</Button>
          </form>
        </CardContent>
      </Card>

      {/* Location Selector Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
            <LocationSelector onSelect={handleLocationSelect} />
            <Button onClick={closeLocationModal} className="mt-4">Close</Button>
          </div>
        </div>
      )}
    </>
  );
}
