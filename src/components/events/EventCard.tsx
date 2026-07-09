import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface EventCardProps {
  title: string;
  subtitle?: string;
  slug: string;
  description?: string;
}

export function EventCard({ title, subtitle, slug, description }: EventCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      {description && <CardContent>{description}</CardContent>}
      <CardContent>
        <Link to={`/events/${slug}`} className="inline-block mt-2 text-primary hover:underline">
          View Details
        </Link>
      </CardContent>
    </Card>
  );
}
