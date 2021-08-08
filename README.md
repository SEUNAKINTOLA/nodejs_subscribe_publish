A server (or set of servers) will keep track of topics -> subscribers where a topic is a string and a subscriber is an HTTP endpoint. When a message is published on a topic, it should be forwarded to all subscriber endpoints.

#API DOCUMENTATION

- Create a subscription
    POST /subscribe/{topic}

    Expected Body
    ```
    {
    url: string
    }
    ```
    Success Response
    ```
    {
    url: string,
    topic: string
    }
    ```



- Publish message to topic
    POST /publish/{topic}
    POSTing to this endpoint should send HTTP requests to any current subscribers for the specified {topic} . It is valid
    to publish to topics with no subscribers. If there are multiple subscribers they should all be notified.
    
    Expected Body
    // must be a javascript object {}, it can contain any keys and have nested data
    ```
    {
    [key: string]: any
    }
    ```
