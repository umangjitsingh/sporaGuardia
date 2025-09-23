import React from 'react';
import  logo  from '../assets/logon.png';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
	return (
		<div className="container mx-auto sm:p-20 pt-10">
			<h1 className="text-4xl font-bold text-center text-gray-700 mb-8 font-pop underline tracking-tight ">Get In Touch</h1>
			<div className="grid md:grid-cols-2 gap-12 bg-[#dedede] shadow-sm sm:p-16 p-8 rounded-lg">

				<div className="space-y-8">
					<h2 className="text-2xl font-bold">Contact Information</h2>
					<div className="space-y-6 text-gray-700">
						<div className="flex items-start sm:gap-4 gap-3">
							<MapPin className="w-6 h-6 text-blue-800 mt-1" />
							<div className="w-2/3">
								<h3 className="font-semibold">Address</h3>
								<p className=" text-sm font-medium  ">123 Science Park, Innovation Avenue, Tech City, 12345</p>
							</div>
						</div>
						<div className="flex items-start sm:gap-4 gap-3">
							<Phone className="w-6 h-6 text-blue-800 mt-1" />
							<div className="w-2/3">
								<h3 className="font-semibold">Phone</h3>
								<p className=" text-sm font-medium">(123) 456-7890</p>
							</div>
						</div>
						<div className="flex items-start sm:gap-4 gap-3">
							<Mail className="w-6 h-6 text-blue-800 mt-1" />
							<div className="w-2/3">
								<h3 className="font-semibold">Email</h3>
								<p className=" text-sm font-medium">contact@microlab.com</p>
							</div>
						</div>
					</div>
				</div>
				<img src={logo} alt="logo" className="rounded-lg shadow-sm"/>
			</div>
		</div>
	);
}

