import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react"; // Good choice for quote icon
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For future images

interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  avatarInitials: string;
  avatarImg?: string; // Optional for actual image
}

// Keep your testimonial data focused on artist benefits
const testimonials: Testimonial[] = [
  {
    quote:
      "GoVibeful helps me focus on teaching my craft, not marketing. I've reached so many new students in my city and finally have a consistent income from my workshops!",
    authorName: "Priya K.",
    authorRole: "Mandala Artist, Bangalore",
    avatarInitials: "PK",
    avatarImg:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    quote:
      "It was a great honor to be the first GoVibeful artist. GoVibeful is introducing a fresh and inspiring way to experience art, and I'm proud to be part of this journey",
    authorName: "Akansha Sharma.",
    authorRole: "Water and acrylic Artist, Delhi",
    avatarInitials: "AS",
    avatarImg:
      "https://res.cloudinary.com/dv9mzq2bv/image/upload/v1748969461/Akansha_Sharma_aexlhb.jpg",
  },
  {
    quote:
      "As a solo artist, handling bookings and payments was a headache. GoVibeful handles the logistics, so I can just share my passion for pottery.",
    authorName: "Aisha B.",
    authorRole: "Ceramic Artist, Mumbai",
    avatarInitials: "AB",
    avatarImg:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Hear from Our Thriving Artists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real stories from independent Indian artists growing with GoVibeful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex flex-col bg-card border shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out group"
            >
              <CardHeader className="pb-4 pt-8">
                <MessageSquare className="w-8 h-8 text-primary opacity-70 mb-3 transition-all duration-300 group-hover:opacity-100" />
              </CardHeader>
              <CardContent className="flex-grow">
                <blockquote className="text-foreground/90 italic leading-relaxed text-md">
                  “{testimonial.quote}”
                </blockquote>
              </CardContent>
              <CardFooter className="pt-6 pb-8 mt-auto border-t border-border/70">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-11 w-11 border-2 border-primary/20">
                    {testimonial.avatarImg && (
                      <AvatarImage
                        src={testimonial.avatarImg}
                        alt={testimonial.authorName}
                      />
                    )}
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {testimonial.avatarInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.authorName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.authorRole}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;
