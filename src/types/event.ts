export type YelpResponse = {
  events: {
    id: string
    name: string
    description: string
    category: string
    cost: string
    is_free: boolean
    time_start: string
    time_end: string
    is_canceled: boolean
    event_site_url: string
    image_url: string
    interested_count: number
    attending_count: number
    location: {
      address1: string
      city: string
      zip_code: string
      country: string
      state: string
      display_address: string[]
    },
    business_id: string
  }[]
  total: number
  region: {
    center: {
      latitude: number
      longitude: number
    }
  }
}

export type TicketmasterResponse = {
  _embedded: {
    events: {
      name: string
      type: string
      id: string
      test: boolean
      url: string
      locale: string
      images: {
        ratio: string
        url: string
        width: number
        height: number
        fallback: boolean
      }[],
      sales: {
        public: {
          startDateTime: string
          endDateTime: string
        }
      },
      dates: {
        start: {
          localDate: string
          localTime: string
          dateTime: string
        },
        end?: {
          localDate: string
          localTime: string
          dateTime: string
        },
        timezone: string
      },
      classifications: {
        primary: boolean
        segment: {
          id: string
          name: string
        },
        genre: {
          id: string
          name: string
        }
      }[],
      info: string
      priceRanges: {
        type: string
        currency: string
        min: number
        max: number
      }[],
      _embedded: {
        venues: {
          name: string
          type: string
          id: string
          address: {
            line1: string
          },
          city: {
            name: string
          },
          state: {
            name: string
            stateCode: string
          },
          country: {
            name: string
            countryCode: string
          },
          postalCode: string
          location: {
            longitude: string
            latitude: string
          }
        }[]
      }
    }[]
  }
  page: {
    size: number
    totalElements: number
    totalPages: number
    number: number
  }
}

export type FoursquareResponse = {
  results: {
    fsq_id: string
    categories: {
      id: number
      name: string
      icon: {
        prefix: string
        suffix: string
      }
    }[]
    chains: unknown[]
    distance: number
    geocodes: {
      main: {
        latitude: number
        longitude: number
      }
    },
    location: {
      address: string
      country: string
      cross_street: string
      formatted_address: string
      locality: string
      postcode: string
      region: string
    },
    name: string
    related_places: {},
    timezone: string
    description: string
    event_date: string
    event_end_date: string
    photos: {
      id: string
      created_at: string
      prefix: string
      suffix: string
      width: number,
      height: number
    }[]
    popularity: number
    price: number
    rating: number
    venue_url: string
  }[]
  context: {
    geo_bounds: {
      circle: {
        center: {
          latitude: number
          longitude: number
        },
        radius: number
      }
    }
  }
}

export enum EventSourceEnum {
  YELP = 'Yelp',
  FOURSQUARE = 'Foursquare',
  TICKETMASTER = 'Ticketmaster'
}

export interface IEvent {
  id: string
  name: string
  description: string
  location: string
  startTime: string
  endTime: string
  url: string
  images: string[]
  category: string
}

export interface YelpEvent extends IEvent {
  source: EventSourceEnum.YELP,
  estimatedCost: string
}

export interface FoursquareEvent extends IEvent {
  source: EventSourceEnum.FOURSQUARE
  price: number
}

export interface TicketmasterEvent extends IEvent {
  source: EventSourceEnum.TICKETMASTER,
  priceRanges: {
    min: number,
    max: number,
  }[]
}

export type Event = YelpEvent | FoursquareEvent | TicketmasterEvent
