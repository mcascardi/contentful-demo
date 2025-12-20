import json
import boto3
from decimal import Decimal

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('contentful-blog-likes')

def lambda_handler(event, context):
    # Enable CORS
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    }

    # Handle preflight OPTIONS request
    if event.get('requestContext', {}).get('http', {}).get('method') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps({'message': 'OK'})
        }

    try:
        # Parse the request
        http_method = event.get('requestContext', {}).get('http', {}).get('method', 'GET')

        if http_method == 'GET':
            # Get likes count
            query_params = event.get('queryStringParameters', {})
            slug = query_params.get('slug') if query_params else None

            if not slug:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'slug parameter required'})
                }

            # Get item from DynamoDB
            response = table.get_item(Key={'slug': slug})
            likes = int(response.get('Item', {}).get('likes', 0))

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'slug': slug, 'likes': likes})
            }

        elif http_method == 'POST':
            # Increment likes
            body = json.loads(event.get('body', '{}'))
            slug = body.get('slug')

            if not slug:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'slug required in body'})
                }

            # Increment likes in DynamoDB
            response = table.update_item(
                Key={'slug': slug},
                UpdateExpression='SET likes = if_not_exists(likes, :start) + :inc',
                ExpressionAttributeValues={':inc': 1, ':start': 0},
                ReturnValues='ALL_NEW'
            )

            likes = int(response['Attributes']['likes'])

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'slug': slug, 'likes': likes})
            }

        else:
            return {
                'statusCode': 405,
                'headers': headers,
                'body': json.dumps({'error': 'Method not allowed'})
            }

    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Internal server error', 'message': str(e)})
        }

