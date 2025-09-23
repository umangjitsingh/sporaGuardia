import React from 'react';


const teamMembers = [
	{ name: 'Dr. Evelyn Reed', role: 'Chief Microbiologist', image: 'https://plus.unsplash.com/premium_photo-1661374909989-d653eaa4f62d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2NpZW50aXN0fGVufDB8fDB8fHww' },
	{ name: 'Dr. Samuel Chen', role: 'Head of Food Safety', image: 'https://images.unsplash.com/photo-1562789233-495f52b583dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2NpZW50aXN0fGVufDB8fDB8fHww' },
	{ name: 'Dr. Alisha Khan', role: 'Lead Researcher', image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500' },
];

export default function AboutPage() {
	return (
		<div className="container mx-auto px-6 pt-12 pb-8">
			<h1 className="text-3xl font-bold text-center text-gray-700 mb-8 font-pop tracking-tight underline">About SporaGuardia</h1>

			<div className="mb-12 shadow-sm rounded-lg ">
				<div className="p-8 grid md:grid-cols-2 gap-8 items-center bg-[#dedede] border border-gray-300">
					<div>
						<h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
						<p className="text-gray-600 leading-relaxed">
							At SporaGuardia, our mission is to safeguard public health by providing the most accurate and reliable microbial testing services for the food industry. We are committed to upholding the highest standards of scientific integrity and customer service, empowering our clients to deliver safe, quality products to consumers worldwide.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row md:flex-row lg-flex-row justify-around items-center p-2 gap-2">
						<img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop" alt="Lab scientists" className="rounded-lg h-60 w-68 " />
						<img src="https://plus.unsplash.com/premium_photo-1676325102866-43a380c00b0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFjdGVyaWF8ZW58MHx8MHx8fDA%3D" alt="Lab scientists" className="rounded-lg h-60 w-68" /></div>

				</div>
			</div>

			<section>
				<h2 className="text-3xl font-bold text-center text-gray-700 mb-8 font-pop pt-16 tracking-tight underline">Meet Our Experts</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
					{teamMembers.map(member => (
						<div key={member.name} className="text-center overflow-hidden bg-[#dedede] border border-gray-300 p-8 flex flex-col items-center shadow-sm ">
							<img src={`${member.image}`} alt={member.name} className=" h-60 w-72 object-cover object-center rounded-lg" />

								<div className="font-medium pt-1">{member.name}</div>
								<p className="text-gray-600 text-sm font-medium">{member.role}</p>

						</div>
					))}
				</div>
			</section>
		</div>
	);
}