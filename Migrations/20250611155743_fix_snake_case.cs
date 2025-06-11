using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Team_Project_Meta.Migrations
{
    /// <inheritdoc />
    public partial class fix_snake_case : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_cartitems_carts_CartId",
                table: "cartitems");

            migrationBuilder.DropForeignKey(
                name: "FK_cartitems_products_ProductId",
                table: "cartitems");

            migrationBuilder.DropForeignKey(
                name: "FK_carts_users_UserId",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "FK_favoritesproducts_products_ProductId",
                table: "favoritesproducts");

            migrationBuilder.DropForeignKey(
                name: "FK_favoritesproducts_users_UserId",
                table: "favoritesproducts");

            migrationBuilder.DropForeignKey(
                name: "FK_orderitems_orders_OrderId",
                table: "orderitems");

            migrationBuilder.DropForeignKey(
                name: "FK_orderitems_products_ProductId",
                table: "orderitems");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_deliveryservices_DeliveryServiceId",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_users_UserId",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_payments_orders_OrderId",
                table: "payments");

            migrationBuilder.DropForeignKey(
                name: "FK_products_categories_CategoryId",
                table: "products");

            migrationBuilder.DropForeignKey(
                name: "FK_products_users_SellerId",
                table: "products");

            migrationBuilder.DropForeignKey(
                name: "FK_reviews_products_ProductId",
                table: "reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_reviews_users_UserId",
                table: "reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_orderitems",
                table: "orderitems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_favoritesproducts",
                table: "favoritesproducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_deliveryservices",
                table: "deliveryservices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_cartitems",
                table: "cartitems");

            migrationBuilder.RenameTable(
                name: "orderitems",
                newName: "order_items");

            migrationBuilder.RenameTable(
                name: "favoritesproducts",
                newName: "favorites_products");

            migrationBuilder.RenameTable(
                name: "deliveryservices",
                newName: "delivery_services");

            migrationBuilder.RenameTable(
                name: "cartitems",
                newName: "cart_items");

            migrationBuilder.RenameColumn(
                name: "Role",
                table: "users",
                newName: "role");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "users",
                newName: "email");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "users",
                newName: "country");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "users",
                newName: "city");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "users",
                newName: "address");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "users",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "PostalCode",
                table: "users",
                newName: "postal_code");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "users",
                newName: "password_hash");

            migrationBuilder.RenameColumn(
                name: "LastUpdatedDate",
                table: "users",
                newName: "last_updated_date");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "users",
                newName: "last_name");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "users",
                newName: "first_name");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "users",
                newName: "created_date");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "reviews",
                newName: "rating");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "reviews",
                newName: "comment");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "reviews",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "reviews",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "reviews",
                newName: "product_id");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "reviews",
                newName: "created_date");

            migrationBuilder.RenameIndex(
                name: "IX_reviews_UserId",
                table: "reviews",
                newName: "IX_reviews_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_reviews_ProductId",
                table: "reviews",
                newName: "IX_reviews_product_id");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "products",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "products",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "StockQuantity",
                table: "products",
                newName: "stock_quantity");

            migrationBuilder.RenameColumn(
                name: "SellerId",
                table: "products",
                newName: "seller_id");

            migrationBuilder.RenameColumn(
                name: "ReviewCount",
                table: "products",
                newName: "review_count");

            migrationBuilder.RenameColumn(
                name: "ProductName",
                table: "products",
                newName: "product_name");

            migrationBuilder.RenameColumn(
                name: "ProductDescription",
                table: "products",
                newName: "product_description");

            migrationBuilder.RenameColumn(
                name: "LastUpdatedDate",
                table: "products",
                newName: "last_updated_date");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "products",
                newName: "created_date");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "products",
                newName: "category_id");

            migrationBuilder.RenameColumn(
                name: "AverageRating",
                table: "products",
                newName: "average_rating");

            migrationBuilder.RenameIndex(
                name: "IX_products_SellerId",
                table: "products",
                newName: "IX_products_seller_id");

            migrationBuilder.RenameIndex(
                name: "IX_products_CategoryId",
                table: "products",
                newName: "IX_products_category_id");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "payments",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "payments",
                newName: "amount");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "payments",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "PaymentMethod",
                table: "payments",
                newName: "payment_method");

            migrationBuilder.RenameColumn(
                name: "PaymentDate",
                table: "payments",
                newName: "payment_date");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "payments",
                newName: "order_id");

            migrationBuilder.RenameIndex(
                name: "IX_payments_OrderId",
                table: "payments",
                newName: "IX_payments_order_id");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "orders",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "orders",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "orders",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "TrackingNumber",
                table: "orders",
                newName: "tracking_number");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "orders",
                newName: "total_price");

            migrationBuilder.RenameColumn(
                name: "LastUpdatedDate",
                table: "orders",
                newName: "last_updated_date");

            migrationBuilder.RenameColumn(
                name: "DeliveryServiceId",
                table: "orders",
                newName: "delivery_service_id");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "orders",
                newName: "created_date");

            migrationBuilder.RenameIndex(
                name: "IX_orders_UserId",
                table: "orders",
                newName: "IX_orders_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_orders_DeliveryServiceId",
                table: "orders",
                newName: "IX_orders_delivery_service_id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "categories",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "CategorieName",
                table: "categories",
                newName: "categorie_name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "carts",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "carts",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "LastUpdatedDate",
                table: "carts",
                newName: "last_updated_date");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "carts",
                newName: "created_date");

            migrationBuilder.RenameIndex(
                name: "IX_carts_UserId",
                table: "carts",
                newName: "IX_carts_user_id");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "order_items",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "order_items",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "order_items",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "order_items",
                newName: "product_id");

            migrationBuilder.RenameColumn(
                name: "OrderId",
                table: "order_items",
                newName: "order_id");

            migrationBuilder.RenameIndex(
                name: "IX_orderitems_ProductId",
                table: "order_items",
                newName: "IX_order_items_product_id");

            migrationBuilder.RenameIndex(
                name: "IX_orderitems_OrderId",
                table: "order_items",
                newName: "IX_order_items_order_id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "favorites_products",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "favorites_products",
                newName: "user_id");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "favorites_products",
                newName: "product_id");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "favorites_products",
                newName: "created_date");

            migrationBuilder.RenameIndex(
                name: "IX_favoritesproducts_UserId",
                table: "favorites_products",
                newName: "IX_favorites_products_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_favoritesproducts_ProductId",
                table: "favorites_products",
                newName: "IX_favorites_products_product_id");

            migrationBuilder.RenameColumn(
                name: "Website",
                table: "delivery_services",
                newName: "website");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "delivery_services",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "delivery_services",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "cart_items",
                newName: "quantity");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "cart_items",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "cart_items",
                newName: "product_id");

            migrationBuilder.RenameColumn(
                name: "CartId",
                table: "cart_items",
                newName: "cart_id");

            migrationBuilder.RenameIndex(
                name: "IX_cartitems_ProductId",
                table: "cart_items",
                newName: "IX_cart_items_product_id");

            migrationBuilder.RenameIndex(
                name: "IX_cartitems_CartId",
                table: "cart_items",
                newName: "IX_cart_items_cart_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_order_items",
                table: "order_items",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_favorites_products",
                table: "favorites_products",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_delivery_services",
                table: "delivery_services",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_cart_items",
                table: "cart_items",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_cart_items_carts_cart_id",
                table: "cart_items",
                column: "cart_id",
                principalTable: "carts",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_cart_items_products_product_id",
                table: "cart_items",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_carts_users_user_id",
                table: "carts",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_favorites_products_products_product_id",
                table: "favorites_products",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_favorites_products_users_user_id",
                table: "favorites_products",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_order_items_orders_order_id",
                table: "order_items",
                column: "order_id",
                principalTable: "orders",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_order_items_products_product_id",
                table: "order_items",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_delivery_services_delivery_service_id",
                table: "orders",
                column: "delivery_service_id",
                principalTable: "delivery_services",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_users_user_id",
                table: "orders",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_payments_orders_order_id",
                table: "payments",
                column: "order_id",
                principalTable: "orders",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_products_categories_category_id",
                table: "products",
                column: "category_id",
                principalTable: "categories",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_products_users_seller_id",
                table: "products",
                column: "seller_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reviews_products_product_id",
                table: "reviews",
                column: "product_id",
                principalTable: "products",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reviews_users_user_id",
                table: "reviews",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_cart_items_carts_cart_id",
                table: "cart_items");

            migrationBuilder.DropForeignKey(
                name: "FK_cart_items_products_product_id",
                table: "cart_items");

            migrationBuilder.DropForeignKey(
                name: "FK_carts_users_user_id",
                table: "carts");

            migrationBuilder.DropForeignKey(
                name: "FK_favorites_products_products_product_id",
                table: "favorites_products");

            migrationBuilder.DropForeignKey(
                name: "FK_favorites_products_users_user_id",
                table: "favorites_products");

            migrationBuilder.DropForeignKey(
                name: "FK_order_items_orders_order_id",
                table: "order_items");

            migrationBuilder.DropForeignKey(
                name: "FK_order_items_products_product_id",
                table: "order_items");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_delivery_services_delivery_service_id",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_orders_users_user_id",
                table: "orders");

            migrationBuilder.DropForeignKey(
                name: "FK_payments_orders_order_id",
                table: "payments");

            migrationBuilder.DropForeignKey(
                name: "FK_products_categories_category_id",
                table: "products");

            migrationBuilder.DropForeignKey(
                name: "FK_products_users_seller_id",
                table: "products");

            migrationBuilder.DropForeignKey(
                name: "FK_reviews_products_product_id",
                table: "reviews");

            migrationBuilder.DropForeignKey(
                name: "FK_reviews_users_user_id",
                table: "reviews");

            migrationBuilder.DropPrimaryKey(
                name: "PK_order_items",
                table: "order_items");

            migrationBuilder.DropPrimaryKey(
                name: "PK_favorites_products",
                table: "favorites_products");

            migrationBuilder.DropPrimaryKey(
                name: "PK_delivery_services",
                table: "delivery_services");

            migrationBuilder.DropPrimaryKey(
                name: "PK_cart_items",
                table: "cart_items");

            migrationBuilder.RenameTable(
                name: "order_items",
                newName: "orderitems");

            migrationBuilder.RenameTable(
                name: "favorites_products",
                newName: "favoritesproducts");

            migrationBuilder.RenameTable(
                name: "delivery_services",
                newName: "deliveryservices");

            migrationBuilder.RenameTable(
                name: "cart_items",
                newName: "cartitems");

            migrationBuilder.RenameColumn(
                name: "role",
                table: "users",
                newName: "Role");

            migrationBuilder.RenameColumn(
                name: "email",
                table: "users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "country",
                table: "users",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "city",
                table: "users",
                newName: "City");

            migrationBuilder.RenameColumn(
                name: "address",
                table: "users",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "postal_code",
                table: "users",
                newName: "PostalCode");

            migrationBuilder.RenameColumn(
                name: "password_hash",
                table: "users",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "last_updated_date",
                table: "users",
                newName: "LastUpdatedDate");

            migrationBuilder.RenameColumn(
                name: "last_name",
                table: "users",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "first_name",
                table: "users",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "created_date",
                table: "users",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "rating",
                table: "reviews",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "comment",
                table: "reviews",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "reviews",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "reviews",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "product_id",
                table: "reviews",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "created_date",
                table: "reviews",
                newName: "CreatedDate");

            migrationBuilder.RenameIndex(
                name: "IX_reviews_user_id",
                table: "reviews",
                newName: "IX_reviews_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_reviews_product_id",
                table: "reviews",
                newName: "IX_reviews_ProductId");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "products",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "products",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "stock_quantity",
                table: "products",
                newName: "StockQuantity");

            migrationBuilder.RenameColumn(
                name: "seller_id",
                table: "products",
                newName: "SellerId");

            migrationBuilder.RenameColumn(
                name: "review_count",
                table: "products",
                newName: "ReviewCount");

            migrationBuilder.RenameColumn(
                name: "product_name",
                table: "products",
                newName: "ProductName");

            migrationBuilder.RenameColumn(
                name: "product_description",
                table: "products",
                newName: "ProductDescription");

            migrationBuilder.RenameColumn(
                name: "last_updated_date",
                table: "products",
                newName: "LastUpdatedDate");

            migrationBuilder.RenameColumn(
                name: "created_date",
                table: "products",
                newName: "CreatedDate");

            migrationBuilder.RenameColumn(
                name: "category_id",
                table: "products",
                newName: "CategoryId");

            migrationBuilder.RenameColumn(
                name: "average_rating",
                table: "products",
                newName: "AverageRating");

            migrationBuilder.RenameIndex(
                name: "IX_products_seller_id",
                table: "products",
                newName: "IX_products_SellerId");

            migrationBuilder.RenameIndex(
                name: "IX_products_category_id",
                table: "products",
                newName: "IX_products_CategoryId");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "payments",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "amount",
                table: "payments",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "payments",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "payment_method",
                table: "payments",
                newName: "PaymentMethod");

            migrationBuilder.RenameColumn(
                name: "payment_date",
                table: "payments",
                newName: "PaymentDate");

            migrationBuilder.RenameColumn(
                name: "order_id",
                table: "payments",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_payments_order_id",
                table: "payments",
                newName: "IX_payments_OrderId");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "orders",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "orders",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "orders",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "tracking_number",
                table: "orders",
                newName: "TrackingNumber");

            migrationBuilder.RenameColumn(
                name: "total_price",
                table: "orders",
                newName: "TotalPrice");

            migrationBuilder.RenameColumn(
                name: "last_updated_date",
                table: "orders",
                newName: "LastUpdatedDate");

            migrationBuilder.RenameColumn(
                name: "delivery_service_id",
                table: "orders",
                newName: "DeliveryServiceId");

            migrationBuilder.RenameColumn(
                name: "created_date",
                table: "orders",
                newName: "CreatedDate");

            migrationBuilder.RenameIndex(
                name: "IX_orders_user_id",
                table: "orders",
                newName: "IX_orders_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_orders_delivery_service_id",
                table: "orders",
                newName: "IX_orders_DeliveryServiceId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "categories",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "categorie_name",
                table: "categories",
                newName: "CategorieName");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "carts",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "carts",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "last_updated_date",
                table: "carts",
                newName: "LastUpdatedDate");

            migrationBuilder.RenameColumn(
                name: "created_date",
                table: "carts",
                newName: "CreatedDate");

            migrationBuilder.RenameIndex(
                name: "IX_carts_user_id",
                table: "carts",
                newName: "IX_carts_UserId");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "orderitems",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "price",
                table: "orderitems",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "orderitems",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "product_id",
                table: "orderitems",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "order_id",
                table: "orderitems",
                newName: "OrderId");

            migrationBuilder.RenameIndex(
                name: "IX_order_items_product_id",
                table: "orderitems",
                newName: "IX_orderitems_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_order_items_order_id",
                table: "orderitems",
                newName: "IX_orderitems_OrderId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "favoritesproducts",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "user_id",
                table: "favoritesproducts",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "product_id",
                table: "favoritesproducts",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "created_date",
                table: "favoritesproducts",
                newName: "CreatedDate");

            migrationBuilder.RenameIndex(
                name: "IX_favorites_products_user_id",
                table: "favoritesproducts",
                newName: "IX_favoritesproducts_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_favorites_products_product_id",
                table: "favoritesproducts",
                newName: "IX_favoritesproducts_ProductId");

            migrationBuilder.RenameColumn(
                name: "website",
                table: "deliveryservices",
                newName: "Website");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "deliveryservices",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "deliveryservices",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "quantity",
                table: "cartitems",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "cartitems",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "product_id",
                table: "cartitems",
                newName: "ProductId");

            migrationBuilder.RenameColumn(
                name: "cart_id",
                table: "cartitems",
                newName: "CartId");

            migrationBuilder.RenameIndex(
                name: "IX_cart_items_product_id",
                table: "cartitems",
                newName: "IX_cartitems_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_cart_items_cart_id",
                table: "cartitems",
                newName: "IX_cartitems_CartId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_orderitems",
                table: "orderitems",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_favoritesproducts",
                table: "favoritesproducts",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_deliveryservices",
                table: "deliveryservices",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_cartitems",
                table: "cartitems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_cartitems_carts_CartId",
                table: "cartitems",
                column: "CartId",
                principalTable: "carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_cartitems_products_ProductId",
                table: "cartitems",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_carts_users_UserId",
                table: "carts",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_favoritesproducts_products_ProductId",
                table: "favoritesproducts",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_favoritesproducts_users_UserId",
                table: "favoritesproducts",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orderitems_orders_OrderId",
                table: "orderitems",
                column: "OrderId",
                principalTable: "orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orderitems_products_ProductId",
                table: "orderitems",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_orders_deliveryservices_DeliveryServiceId",
                table: "orders",
                column: "DeliveryServiceId",
                principalTable: "deliveryservices",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_orders_users_UserId",
                table: "orders",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_payments_orders_OrderId",
                table: "payments",
                column: "OrderId",
                principalTable: "orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_products_categories_CategoryId",
                table: "products",
                column: "CategoryId",
                principalTable: "categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_products_users_SellerId",
                table: "products",
                column: "SellerId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reviews_products_ProductId",
                table: "reviews",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_reviews_users_UserId",
                table: "reviews",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
