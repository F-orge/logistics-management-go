import { graphql } from "@/lib/graphql/client";

// ============================================================================
// QUOTE MUTATIONS
// ============================================================================

/**
 * Creates a new billing quote.
 * @param payload The input data for creating the quote.
 */
export const createQuote = graphql(`
  mutation CreateQuote($payload: CreateQuoteInput!) {
    billing {
      createQuote(payload: $payload) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the client ID of a billing quote.
 * @param id The UUID of the quote to update.
 * @param clientId The new client ID.
 */
export const updateQuoteClientId = graphql(`
  mutation UpdateQuoteClientId($id: UUID!, $clientId: UUID) {
    billing {
      updateQuoteClientId(id: $id, clientId: $clientId) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the origin details of a billing quote.
 * @param id The UUID of the quote to update.
 * @param originDetails The new origin details.
 */
export const updateQuoteOriginDetails = graphql(`
  mutation UpdateQuoteOriginDetails($id: UUID!, $originDetails: String!) {
    billing {
      updateQuoteOriginDetails(id: $id, originDetails: $originDetails) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the destination details of a billing quote.
 * @param id The UUID of the quote to update.
 * @param destinationDetails The new destination details.
 */
export const updateQuoteDestinationDetails = graphql(`
  mutation UpdateQuoteDestinationDetails($id: UUID!, $destinationDetails: String!) {
    billing {
      updateQuoteDestinationDetails(id: $id, destinationDetails: $destinationDetails) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the weight of a billing quote.
 * @param id The UUID of the quote to update.
 * @param weight The new weight.
 */
export const updateQuoteWeight = graphql(`
  mutation UpdateQuoteWeight($id: UUID!, $weight: Float) {
    billing {
      updateQuoteWeight(id: $id, weight: $weight) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the length of a billing quote.
 * @param id The UUID of the quote to update.
 * @param length The new length.
 */
export const updateQuoteLength = graphql(`
  mutation UpdateQuoteLength($id: UUID!, $length: Float) {
    billing {
      updateQuoteLength(id: $id, length: $length) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the width of a billing quote.
 * @param id The UUID of the quote to update.
 * @param width The new width.
 */
export const updateQuoteWidth = graphql(`
  mutation UpdateQuoteWidth($id: UUID!, $width: Float) {
    billing {
      updateQuoteWidth(id: $id, width: $width) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the height of a billing quote.
 * @param id The UUID of the quote to update.
 * @param height The new height.
 */
export const updateQuoteHeight = graphql(`
  mutation UpdateQuoteHeight($id: UUID!, $height: Float) {
    billing {
      updateQuoteHeight(id: $id, height: $height) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the quoted price of a billing quote.
 * @param id The UUID of the quote to update.
 * @param quotedPrice The new quoted price.
 */
export const updateQuoteQuotedPrice = graphql(`
  mutation UpdateQuoteQuotedPrice($id: UUID!, $quotedPrice: Float!) {
    billing {
      updateQuoteQuotedPrice(id: $id, quotedPrice: $quotedPrice) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the service level of a billing quote.
 * @param id The UUID of the quote to update.
 * @param serviceLevel The new service level.
 */
export const updateQuoteServiceLevel = graphql(`
  mutation UpdateQuoteServiceLevel($id: UUID!, $serviceLevel: String) {
    billing {
      updateQuoteServiceLevel(id: $id, serviceLevel: $serviceLevel) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the expiration timestamp of a billing quote.
 * @param id The UUID of the quote to update.
 * @param expiresAt The new expiration timestamp.
 */
export const updateQuoteExpiresAt = graphql(`
  mutation UpdateQuoteExpiresAt($id: UUID!, $expiresAt: DateTime) {
    billing {
      updateQuoteExpiresAt(id: $id, expiresAt: $expiresAt) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the status of a billing quote.
 * @param id The UUID of the quote to update.
 * @param status The new status.
 */
export const updateQuoteStatus = graphql(`
  mutation UpdateQuoteStatus($id: UUID!, $status: QuoteStatusEnum!) {
    billing {
      updateQuoteStatus(id: $id, status: $status) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the quote number of a billing quote.
 * @param id The UUID of the quote to update.
 * @param quoteNumber The new quote number.
 */
export const updateQuoteQuoteNumber = graphql(`
  mutation UpdateQuoteQuoteNumber($id: UUID!, $quoteNumber: String) {
    billing {
      updateQuoteQuoteNumber(id: $id, quoteNumber: $quoteNumber) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the notes of a billing quote.
 * @param id The UUID of the quote to update.
 * @param notes The new notes.
 */
export const updateQuoteNotes = graphql(`
  mutation UpdateQuoteNotes($id: UUID!, $notes: String) {
    billing {
      updateQuoteNotes(id: $id, notes: $notes) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the created by user ID of a billing quote.
 * @param id The UUID of the quote to update.
 * @param createdByUserId The new created by user ID.
 */
export const updateQuoteCreatedByUserId = graphql(`
  mutation UpdateQuoteCreatedByUserId($id: UUID!, $createdByUserId: UUID) {
    billing {
      updateQuoteCreatedByUserId(id: $id, createdByUserId: $createdByUserId) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a billing quote by its ID.
 * @param id The UUID of the quote to remove.
 */
export const removeQuote = graphql(`
  mutation RemoveQuote($id: UUID!) {
    billing {
      removeQuote(id: $id)
    }
  }
`);
