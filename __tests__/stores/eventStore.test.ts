import { EventStore } from '../../src/stores/eventStore';
import { getEvents } from '../../src/services/apiService';
import { Event, EventSourceEnum } from '../../src/types/event';

// Mock the getEvents function
jest.mock('../../src/services/apiService', () => ({
  getEvents: jest.fn(),
}));

describe('EventStore', () => {
  let store: EventStore;

  const mockEvents: Event[] = [
    {
      id: 'fsq-weekend-market-brisbane',
      name: 'Weekend Market & Food Festival',
      description: 'Discover local artisans, fresh produce, and international cuisine at Brisbane\'s premier weekend market. Live music and family-friendly activities all day.',
      location: '20 Little Stanley Street, Brisbane QLD 4101',
      source: EventSourceEnum.FOURSQUARE,
      startTime: '2024-02-25T09:00:00+10:00',
      endTime: '2024-02-25T16:00:00+10:00',
      url: 'https://example.com/weekend-market',
      images: ['https://fastly.4sqi.net/img/general/22215264_xnY8G47f5lzpgAJEMPkKcBnHRoKfgGQjV_W1xNXULmU.jpg'],
      category: 'Market',
      price: 1,
    },
    {
      id: 'fsq-art-exhibition-sydney',
      name: 'Contemporary Australian Art Exhibition',
      description: 'Explore the cutting-edge works of Australia\'s most innovative artists. This exhibition showcases diverse perspectives on Australian identity, landscape, and culture.',
      location: '140 George Street, The Rocks, Sydney NSW 2000',
      source: EventSourceEnum.FOURSQUARE,
      startTime: '2024-03-05T10:00:00+11:00',
      endTime: '2024-03-25T17:00:00+11:00',
      url: 'https://example.com/art-exhibition',
      images: ['https://fastly.4sqi.net/img/general/398645_A-7R_30DfqWhpJw3GAdSRznRxN-eG25PafchAQC9Eq0.jpg'],
      category: 'Arts & Culture',
      price: 2,
    },
    {
      id: 'fsq-wine-tasting-melbourne',
      name: 'Victorian Wine Masterclass',
      description: 'Join top sommeliers for an educational journey through Victoria\'s finest wine regions. Sample premium wines and learn about the unique terroir that makes Victorian wines special.',
      location: '45 Flinders Lane, Melbourne VIC 3000',
      source: EventSourceEnum.FOURSQUARE,
      startTime: '2024-02-18T14:00:00+11:00',
      endTime: '2024-02-18T17:00:00+11:00',
      url: 'https://example.com/wine-masterclass',
      images: ['https://fastly.4sqi.net/img/general/212614_omt8rL-S2-Px8AxW9ekGGGs8WsGSARYWeBo3-yS_3zU.jpg'],
      category: 'Wine Tasting',
      price: 3,
    },
    {
      id: 'tm-taylor-swift-eras-tour',
      name: 'Taylor Swift | The Eras Tour',
      description: 'The record-breaking Eras Tour features music from all of Taylor\'s albums, showcasing her journey through musical eras in this spectacular performance.',
      location: 'Marvel Stadium, 740 Bourke Street, Melbourne VIC 3008',
      source: EventSourceEnum.TICKETMASTER,
      startTime: '2024-03-20T19:00:00Z',
      endTime: '',
      url: 'https://example.com/taylor-swift-eras-tour',
      images: ['https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400'],
      category: 'Music',
      priceRanges: [{ min: 89.9, max: 399.9 }],
    },
    {
      id: 'tm-australian-open-2024',
      name: 'Australian Open Tennis Championship',
      description: 'Experience world-class tennis at the first Grand Slam of the year featuring top players from around the globe competing for championship titles.',
      location: 'Melbourne Park, Olympic Boulevard, Melbourne VIC 3000',
      source: EventSourceEnum.TICKETMASTER,
      startTime: '2024-01-14T10:00:00Z',
      endTime: '2024-01-28T22:00:00Z',
      url: 'https://example.com/australian-open',
      images: ['https://images.unsplash.com/photo-1531315630201-bb15abeb1653?w=400'],
      category: 'Sports',
      priceRanges: [{ min: 59.0, max: 899.0 }],
    },
    {
      id: 'tm-hamilton-musical-sydney',
      name: 'Broadway Musical: Hamilton',
      description: 'The Tony Award-winning musical about Alexander Hamilton, one of America\'s founding fathers, featuring a score that blends hip-hop, jazz, R&B and Broadway.',
      location: 'Sydney Lyric Theatre, 55 Pirrama Road, Pyrmont, Sydney NSW 2009',
      source: EventSourceEnum.TICKETMASTER,
      startTime: '2024-02-27T19:30:00Z',
      endTime: '',
      url: 'https://example.com/hamilton-musical',
      images: ['https://images.unsplash.com/photo-1503095396549-807759245b35?w=400'],
      category: 'Arts & Theatre',
      priceRanges: [{ min: 70.0, max: 250.0 }],
    },
    {
      id: 'yelp-melbourne-jazz-festival-2024',
      name: 'Melbourne Jazz Festival - Opening Night',
      description: 'Join us for the opening night of Melbourne\'s premier jazz festival featuring local and international artists. Experience world-class performances in an intimate venue setting.',
      location: '123 Collins Street, Melbourne VIC 3000',
      source: EventSourceEnum.YELP,
      startTime: '2024-02-15T19:30:00+00:00',
      endTime: '2024-02-15T23:00:00+00:00',
      url: 'https://example.com/jazz-festival',
      images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'],
      category: 'Music',
      estimatedCost: '$$',
    },
    {
      id: 'yelp-food-wine-festival-2024',
      name: 'Sydney Food & Wine Festival',
      description: 'Discover Sydney\'s culinary scene with tastings from top restaurants, wine pairings, and chef demonstrations. Perfect for food enthusiasts!',
      location: 'Circular Quay, Sydney NSW 2000',
      source: EventSourceEnum.YELP,
      startTime: '2024-02-18T12:00:00+00:00',
      endTime: '2024-02-18T18:00:00+00:00',
      url: 'https://example.com/food-wine-fest',
      images: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'],
      category: 'Food & Drink',
      estimatedCost: '$$$',
    },
    {
      id: 'yelp-comedy-night-brisbane',
      name: 'Comedy Night at The Powerhouse',
      description: 'Laugh until your sides hurt with Brisbane\'s funniest comedians. Stand-up comedy featuring both established and emerging talent.',
      location: '119 Lamington Street, Brisbane QLD 4006',
      source: EventSourceEnum.YELP,
      startTime: '2024-02-20T20:00:00+00:00',
      endTime: '2024-02-20T22:30:00+00:00',
      url: 'https://example.com/comedy-night',
      images: ['https://images.unsplash.com/photo-1527224450515-e8ca739ccc5a?w=400'],
      category: 'Nightlife',
      estimatedCost: '$',
    },
  ];

  beforeEach(() => {
    store = new EventStore();
    jest.clearAllMocks();
  });

  test('should initialize with default values', () => {
    expect(store.events).toEqual([]);
    expect(store.selectedEvent).toBeNull();
    expect(store.loading).toBeFalsy();
    expect(store.error).toBeNull();
    expect(store.selectedEventError).toBeNull();
  });

  test('should fetch events successfully', async () => {
    (getEvents as jest.Mock).mockResolvedValue({ events: mockEvents });

    await store.fetchEvents();

    expect(getEvents).toHaveBeenCalled();
    expect(store.loading).toBeFalsy();
    expect(store.error).toBeNull();
    expect(store.events).toEqual(mockEvents);
    expect(store.events).toHaveLength(9);
  });

  test('should handle fetch events error', async () => {
    const errorMessage = 'Network error';
    (getEvents as jest.Mock).mockRejectedValue(new Error(errorMessage));

    await store.fetchEvents();

    expect(getEvents).toHaveBeenCalled();
    expect(store.loading).toBeFalsy();
    expect(store.error).toBe(errorMessage);
    expect(store.events).toEqual([]);
  });

  test('should group events by category', () => {
    store.events = mockEvents;

    const grouped = store.eventsByCategory;

    expect(grouped).toEqual({
      'Market': [mockEvents[0]],
      'Arts & Culture': [mockEvents[1]],
      'Wine Tasting': [mockEvents[2]],
      'Music': [mockEvents[3], mockEvents[6]],
      'Sports': [mockEvents[4]],
      'Arts & Theatre': [mockEvents[5]],
      'Food & Drink': [mockEvents[7]],
      'Nightlife': [mockEvents[8]],
    });
    expect(Object.keys(grouped)).toHaveLength(8);
    expect(grouped['Music']).toHaveLength(2);
    expect(grouped['Market']).toHaveLength(1);
  });

  test('should select event by id and source', () => {
    store.events = mockEvents;
    const targetEvent = mockEvents[0]; // Weekend Market & Food Festival

    store.getSelectedEvent('fsq-weekend-market-brisbane', EventSourceEnum.FOURSQUARE);

    expect(store.selectedEvent).toEqual(targetEvent);
    expect(store.selectedEventError).toBeNull();
  });

  test('should set error when selected event not found', () => {
    store.events = mockEvents;

    store.getSelectedEvent('invalid-id', EventSourceEnum.YELP);

    expect(store.selectedEvent).toBeNull();
    expect(store.selectedEventError).toBe('Event not found');
  });

  test('should clear selected event and error', () => {
    store.events = mockEvents;
    store.selectedEvent = mockEvents[0];
    store.selectedEventError = 'Some error';

    store.clearSelectedEvent();

    expect(store.selectedEvent).toBeNull();
    expect(store.selectedEventError).toBeNull();
  });
});