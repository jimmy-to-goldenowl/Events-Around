// Mock API service
// This file should be implemented by the candidate to fetch data from the mock JSON files
import foursquareJson from '../../mock-data/foursquare.json';
import ticketmasterJson from '../../mock-data/ticketmaster.json';
import yelpJson from '../../mock-data/yelp.json';
import { Event } from '../types/event';
import { foursquareResponseMapper, tickermasterResponseMapper, yelpResponseMapper } from '../utils/apiService';

export const getEvents = async (): Promise<{ events: Event[] }> => {
  // Placeholder for API implementation
  // The candidate will need to implement the logic to fetch and process data from the mock JSON files
  const foursquareEvents = foursquareResponseMapper(foursquareJson);
  const ticketmasterEvents = tickermasterResponseMapper(ticketmasterJson);
  const yelpEvents = yelpResponseMapper(yelpJson);
  
  await new Promise(r => setTimeout(r, 1000));

  return {events: [
    ...foursquareEvents,
    ...ticketmasterEvents,
    ...yelpEvents,
  ]};
};

