import { foursquareResponseMapper, tickermasterResponseMapper, yelpResponseMapper } from '../../src/utils/apiService';
import { EventSourceEnum, FoursquareResponse, TicketmasterResponse, YelpResponse } from '../../src/types/event'

describe('apiService Mappers', () => {
  describe('yelpResponseMapper', () => {
    test('should map Yelp response to YelpEvent array', () => {
      const mockResponse: YelpResponse = {
        events: [
          {
            id: "yelp-melbourne-jazz-festival-2024",
            name: "Melbourne Jazz Festival - Opening Night",
            description: "Join us for the opening night of Melbourne's premier jazz festival featuring local and international artists. Experience world-class performances in an intimate venue setting.",
            category: "Music",
            cost: "$$",
            is_free: false,
            time_start: "2024-02-15T19:30:00+00:00",
            time_end: "2024-02-15T23:00:00+00:00",
            is_canceled: false,
            event_site_url: "https://example.com/jazz-festival",
            image_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
            interested_count: 234,
            attending_count: 89,
            location: {
              address1: "123 Collins Street",
              city: "Melbourne",
              zip_code: "3000",
              country: "AU",
              state: "VIC",
              display_address: ["123 Collins Street", "Melbourne VIC 3000"]
            },
            business_id: "jazz-venue-melbourne"
          },
        ],
        total: 3,
        region: {
          center: {
            latitude: -37.8136,
            longitude: 144.9631
          }
        }
      };

      const result = yelpResponseMapper(mockResponse);
      expect(result).toEqual([
        {
          id: 'yelp-melbourne-jazz-festival-2024',
          name: 'Melbourne Jazz Festival - Opening Night',
          description: "Join us for the opening night of Melbourne's premier jazz festival featuring local and international artists. Experience world-class performances in an intimate venue setting.",
          location: '123 Collins Street, Melbourne VIC 3000',
          source: EventSourceEnum.YELP,
          startTime: '2024-02-15T19:30:00+00:00',
          endTime: '2024-02-15T23:00:00+00:00',
          url: 'https://example.com/jazz-festival',
          images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'],
          category: 'Music',
          estimatedCost: '$$',
        },
      ]);
    });
  });

  describe('tickermasterResponseMapper', () => {
    test('should map Ticketmaster response to TicketmasterEvent array', () => {
      const mockResponse: TicketmasterResponse = {
        _embedded: {
          events: [
            {
              "name": "Taylor Swift | The Eras Tour",
              "type": "event",
              "id": "tm-taylor-swift-eras-tour",
              "test": false,
              "url": "https://example.com/taylor-swift-eras-tour",
              "locale": "en-us",
              "images": [
                {
                  "ratio": "16_9",
                  "url": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
                  "width": 640,
                  "height": 360,
                  "fallback": false
                }
              ],
              "sales": {
                "public": {
                  "startDateTime": "2024-01-10T15:00:00Z",
                  "endDateTime": "2024-03-20T23:00:00Z"
                }
              },
              "dates": {
                "start": {
                  "localDate": "2024-03-20",
                  "localTime": "19:00:00",
                  "dateTime": "2024-03-20T19:00:00Z"
                },
                "timezone": "Australia/Melbourne"
              },
              "classifications": [
                {
                  "primary": true,
                  "segment": {
                    "id": "KZFzniwnSyZfZ7v7nJ",
                    "name": "Music"
                  },
                  "genre": {
                    "id": "KnvZfZ7vAev",
                    "name": "Pop"
                  }
                }
              ],
              "info": "The record-breaking Eras Tour features music from all of Taylor's albums, showcasing her journey through musical eras in this spectacular performance.",
              "priceRanges": [
                {
                  "type": "standard",
                  "currency": "AUD",
                  "min": 89.9,
                  "max": 399.9
                }
              ],
              "_embedded": {
                "venues": [
                  {
                    "name": "Marvel Stadium",
                    "type": "venue",
                    "id": "marvel-stadium-melbourne",
                    "address": {
                      "line1": "740 Bourke Street"
                    },
                    "city": {
                      "name": "Melbourne"
                    },
                    "state": {
                      "name": "Victoria",
                      "stateCode": "VIC"
                    },
                    "country": {
                      "name": "Australia",
                      "countryCode": "AU"
                    },
                    "postalCode": "3008",
                    "location": {
                      "longitude": "144.9478",
                      "latitude": "-37.8175"
                    }
                  }
                ]
              }
            },
          ],
        },
        "page": {
          "size": 3,
          "totalElements": 3,
          "totalPages": 1,
          "number": 0
        }
      };

      const result = tickermasterResponseMapper(mockResponse);
      expect(result).toEqual([
        {
          id: 'tm-taylor-swift-eras-tour',
          name: 'Taylor Swift | The Eras Tour',
          description: "The record-breaking Eras Tour features music from all of Taylor's albums, showcasing her journey through musical eras in this spectacular performance.",
          location: 'Marvel Stadium, 740 Bourke Street, Melbourne VIC 3008',
          source: EventSourceEnum.TICKETMASTER,
          startTime: '2024-03-20T19:00:00Z',
          endTime: '',
          url: 'https://example.com/taylor-swift-eras-tour',
          images: ['https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400'],
          category: 'Music',
          priceRanges: [{ min: 89.9, max: 399.9 }],
        },
      ]);
    });
  });

  describe('foursquareResponseMapper', () => {
    test('should map Foursquare response to FoursquareEvent array', () => {
      const mockResponse: FoursquareResponse = {
        results: [
          {
            "fsq_id": "fsq-weekend-market-brisbane",
            "categories": [
              {
                "id": 17114,
                "name": "Market",
                "icon": {
                  "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/market_",
                  "suffix": ".png"
                }
              }
            ],
            "chains": [],
            "distance": 639,
            "geocodes": {
              "main": {
                "latitude": -27.4698,
                "longitude": 153.0251
              }
            },
            "location": {
              "address": "20 Little Stanley Street",
              "country": "AU",
              "cross_street": "",
              "formatted_address": "20 Little Stanley Street, Brisbane QLD 4101",
              "locality": "Brisbane",
              "postcode": "4101",
              "region": "QLD"
            },
            "name": "Weekend Market & Food Festival",
            "related_places": {},
            "timezone": "Australia/Brisbane",
            "description": "Discover local artisans, fresh produce, and international cuisine at Brisbane's premier weekend market. Live music and family-friendly activities all day.",
            "event_date": "2024-02-25T09:00:00+10:00",
            "event_end_date": "2024-02-25T16:00:00+10:00",
            "photos": [
              {
                "id": "5b39f172b72def741a2b9fa0",
                "created_at": "2023-10-01T08:34:00.000Z",
                "prefix": "https://fastly.4sqi.net/img/general/",
                "suffix": "/22215264_xnY8G47f5lzpgAJEMPkKcBnHRoKfgGQjV_W1xNXULmU.jpg",
                "width": 1440,
                "height": 1920
              }
            ],
            "popularity": 0.9782,
            "price": 1,
            "rating": 4.5,
            "venue_url": "https://example.com/weekend-market"
          }
        ],
        "context": {
          "geo_bounds": {
            "circle": {
              "center": {
                "latitude": -37.8136,
                "longitude": 144.9631
              },
              "radius": 30000
            }
          }
        }
      };

      const result = foursquareResponseMapper(mockResponse);
      expect(result).toEqual([
        {
          id: 'fsq-weekend-market-brisbane',
          name: 'Weekend Market & Food Festival',
          description: "Discover local artisans, fresh produce, and international cuisine at Brisbane's premier weekend market. Live music and family-friendly activities all day.",
          location: '20 Little Stanley Street, Brisbane QLD 4101',
          source: EventSourceEnum.FOURSQUARE,
          startTime: '2024-02-25T09:00:00+10:00',
          endTime: '2024-02-25T16:00:00+10:00',
          url: 'https://example.com/weekend-market',
          images: ['https://fastly.4sqi.net/img/general/22215264_xnY8G47f5lzpgAJEMPkKcBnHRoKfgGQjV_W1xNXULmU.jpg'],
          category: 'Market',
          price: 1,
        },
      ]);
    });
  });
});