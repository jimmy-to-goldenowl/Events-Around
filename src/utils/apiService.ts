import { EventSourceEnum, FoursquareEvent, FoursquareResponse, TicketmasterEvent, TicketmasterResponse, YelpEvent, YelpResponse } from '../types/event';

export const yelpResponseMapper = (response: YelpResponse): YelpEvent[] => {
  const {events} = response;

  return events.map(event => ({
    id: event.id,
    name: event.name,
    description: event.description,
    location: event.location.display_address.join(', '),
    source: EventSourceEnum.YELP,
    startTime: event.time_start,
    endTime: event.time_end,
    url: event.event_site_url,
    images: [event.image_url],
    category: event.category,
    estimatedCost: event.cost,
  }));
};

export const tickermasterResponseMapper = (response: TicketmasterResponse): TicketmasterEvent[] => {
  const {events} = response._embedded;

  return events.map(event => {
    let location = '';
    if(event._embedded.venues.length > 0) {
      const venue = event._embedded.venues[0];
      location = `${venue.name}, ${venue.address.line1}, ${venue.city.name} ${venue.state.stateCode} ${venue.postalCode}`;
    }

    let category = '';
    if(event.classifications.length > 0) {
      category = event.classifications[0].segment.name;
    }

    return ({
      id: event.id,
      name: event.name,
      description: event.info,
      location,
      source: EventSourceEnum.TICKETMASTER,
      startTime: event.dates.start.dateTime,
      endTime: event.dates.end?.dateTime ?? '',
      url: event.url,
      images: event.images.map(image => image.url),
      category,
      priceRanges: event.priceRanges?.map(item => ({
        min: item.min,
        max: item.max,
      })) ?? []
    });
  });
};

export const foursquareResponseMapper = (response: FoursquareResponse): FoursquareEvent[] => {
  const {results} = response;

  return results.map(event => {
    let category = '';
    if(event.categories.length > 0) {
      category = event.categories[0].name;
    }

    return ({
      id: event.fsq_id,
      name: event.name,
      description: event.description,
      location: event.location.formatted_address,
      source: EventSourceEnum.FOURSQUARE,
      startTime: event.event_date,
      endTime: event.event_end_date,
      url: event.venue_url,
      images: event.photos.map(image => `${image.prefix}${image.suffix.slice(1)}`),
      category,
      price: event.price,
    });
  });
};
