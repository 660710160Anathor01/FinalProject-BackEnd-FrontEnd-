package main

import(
	"fmt"
	"os"
	"database/sql"
	_ "github.com/lib/pq"
	"log"
	"github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "strconv"
	"net/http"
	"time"
  
)

type Company struct {
	CompanyID       int       	`json:"company_id"`
	CompanyName 	string    	`json:"company_name"`
	Email      	    string    	`json:"email"`
}

type Game struct {
	GameID      int       	`json:"game_id"`
	GameName 	string    	`json:"game_name"`
	GameType    string    	`json:"game_type"`
    Icon        string      `json:"icon"`
	CompanyID   int         `json:"company_id"`
	CreatedAt 	time.Time 	`json:"created_at"`
	UpdatedAt 	time.Time 	`json:"updated_at"`
}

type Library struct {
	LibraryID       int       	`json:"library_id"`
	GameID 	        int    	    `json:"game_id"`
	CreatedAt 	    time.Time 	`json:"created_at"`
	
}

type AppUser struct {
	UserID          int       	`json:"user_id"`
    LibraryID	    int     	`json:"library_id"`
	UserName        string    	`json:"user_name"`    	
    Phone           string      `json:"phone"`
    Email 	        string    	`json:"email"`
    Password 	    string    	`json:"password"`

    PaymentDate     time.Time  	`json:"payment_date"`
	IsLogin         bool    	`json:"islogin"`
    CreatedAt 	    time.Time 	`json:"created_at"`
    
}

type Admin struct {
    AdminID     int         `json:"admin_id"`
    AdminName   string      `json:"admin_name"`
    Email       string      `json:"email"`
    Phone       string      `json:"phone"`
    Password    string      `json:"password"`

    IsLogin     bool        `json:"islogin"`  
    CreatedAt 	time.Time 	`json:"created_at"`
}

type Bill struct {
    BillID 	        string    	`json:"bill_id"`
	UserID          string    	`json:"user_id"`
    Price           float64     `json:"price"`
    CreatedAt 	    time.Time 	`json:"created_at"`
}



func getEnv(key, defaultValue string) string{
	if value := os.Getenv(key); value != ""{
		return value
	}
	return defaultValue 
}
//conect db
var db *sql.DB

func initDB(){
	var err error
	host := getEnv("DB_HOST", "")
	name := getEnv("DB_NAME", "")
	user := getEnv("DB_USER","")
	password := getEnv("DB_PASSWORD","")
	port := getEnv("DB_PORT","")

	conSt := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, name)

	db, err = sql.Open("postgres", conSt)
	if err !=nil {
		log.Fatal("failed to open database")
	}
	
	err = db.Ping()
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	log.Print("successfully connect to database")

	// กำหนดจำนวน Connection สูงสุด
	db.SetMaxOpenConns(25)

	// กำหนดจำนวน Idle connection สูงสุด
	db.SetMaxIdleConns(20)

	// กำหนดอายุของ Connection
	db.SetConnMaxLifetime(5 * time.Minute)
}

func getAppUserAuthen(c *gin.Context) {
    var appuser AppUser
    var admin Admin
    if err := c.ShouldBindJSON(&appuser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        fmt.Println("❌ JSON binding error:", err.Error())
        return
    }

    fmt.Println("✅ Email:", appuser.Email)
    fmt.Println("✅ Password:", appuser.Password)

    var role string
    err := db.QueryRow("SELECT user_id FROM appuser WHERE email=$1 AND password=$2", appuser.Email, appuser.Password).Scan(&appuser.UserID)
    if err != nil {

        if err := c.ShouldBindJSON(&admin); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        fmt.Println("❌ JSON binding error:", err.Error())
        return
        }
            err := db.QueryRow("SELECT admin_id FROM admin WHERE email=$1 AND password=$2", admin.Email, admin.Password).Scan(&admin.AdminID)
            if err != nil {
                fmt.Println("❌ QueryRow error:", err)
                c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่พบผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"})
                return
            }       
        role = "admin"
    }

    var result sql.Result

    if role != ""{
        role = "user"
        result,err = db.Exec(`
        UPDATE appuser 
        SET islogin = TRUE 
        WHERE email = $1 AND password = $2
    `, appuser.Email, appuser.Password)
    }else{
        result,err = db.Exec(`
        UPDATE admin 
        SET islogin = TRUE 
        WHERE email = $1 AND password = $2
    `, admin.Email, admin.Password)
    }

    
    

    if err != nil {
        fmt.Println("❌ SQL Update error:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถอัพเดตสถานะการล็อกอินได้"})
        return
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        fmt.Println("❌ RowsAffected error:", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถตรวจสอบผลลัพธ์ของการอัพเดตได้"})
        return
    }

    if rowsAffected == 0 {
        fmt.Println("❌ No rows updated")
        c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถอัพเดตสถานะการล็อกอินได้"})
        return
    }

    fmt.Println("✅ Role:", role)

    c.JSON(http.StatusOK, gin.H{"role": role})
}

//=========================================================================================================================================================================================
// Get
//=========================================================================================================================================================================================

func getAllUser(c *gin.Context) {
    var rows *sql.Rows
    var err error
    rows, err = db.Query("SELECT user_id, library_id, user_name, phone, email, password, payment_date, islogin, created_at FROM app_user")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer rows.Close()

    var app_users []AppUser
    for rows.Next() {
        var app_user AppUser
        err := rows.Scan(&app_user.UserID, &app_user.LibraryID, &app_user.UserName, &app_user.Phone, &app_user.Email, &app_user.Password, &app_user.PaymentDate, &app_user.IsLogin, &app_user.CreatedAt)
        if err != nil {
        }
        app_users = append(app_users, app_user)
    }
	if app_users == nil {
		app_users = []AppUser{}
	}

	c.JSON(http.StatusOK, app_users)
}


func getAppUser(c *gin.Context) {
    id := c.Param("id")
    var appuser AppUser

    err := db.QueryRow("SELECT user_id, library_id, user_name, phone, email, password, payment_date, islogin, created_at FROM app_user WHERE user_id = $1", id).
        Scan(&appuser.UserID, &appuser.LibraryID, &appuser.UserName, &appuser.Phone, &appuser.Email, &appuser.Password, &appuser.PaymentDate, &appuser.IsLogin, &appuser.CreatedAt)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, appuser)
}


func getAdmin(c *gin.Context) {
    id := c.Param("id")
    var admin Admin

    err := db.QueryRow("SELECT admin_id, admin_name, phone, email, password, islogin, created_at FROM admin WHERE admin_id = $1", id).
        Scan(&admin.AdminID, &admin.AdminName, &admin.Phone, &admin.Email, &admin.Password, &admin.IsLogin, &admin.CreatedAt)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "admin not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, admin)
}


func getAllGame(c *gin.Context) {
    var rows *sql.Rows
    var err error

    rows, err = db.Query("SELECT game_id, game_name, game_type, icon, company_id, created_at FROM game")
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer rows.Close()

    var games []Game
    for rows.Next() {
        var game Game
        err := rows.Scan(&game.GameID, &game.GameName, &game.GameType, &game.Icon, &game.CompanyID, &game.CreatedAt)
        if err != nil {
        }
        games = append(games, game)
    }
	if games == nil {
		games = []Game{}
	}

	c.JSON(http.StatusOK, games)
}


func getGame(c *gin.Context) {
    id := c.Param("id")
    var game Game

    err := db.QueryRow("SELECT game_id, game_name, game_type, icon, company_id, created_at FROM game WHERE game_id = $1", id).
        Scan(&game.GameID, &game.GameName, &game.GameType, &game.Icon, &game.CompanyID, &game.CreatedAt)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "game not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, game)
}

func getCompany(c *gin.Context) {
    id := c.Param("id")
    var company Company

    err := db.QueryRow("SELECT company_id, company_name, company_email FROM company WHERE company_id = $1", id).
        Scan(&company.CompanyID, &company.CompanyName, &company.Email)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "company not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, company)
}

func getBill(c *gin.Context) {
    id := c.Param("id")
    var bill Bill

    err := db.QueryRow("SELECT bill_id, user_id, price, created_at FROM company WHERE company_id = $1", id).
        Scan(&bill.BillID, &bill.UserID, &bill.Price, &bill.CreatedAt)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "bill not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, bill)
}

func getLibrary(c *gin.Context) {
    id := c.Param("id")
    var library Library

    err := db.QueryRow("SELECT library_id, game_id, created_at FROM library WHERE library_id = $1", id).
        Scan(&library.LibraryID, &library.GameID, &library.CreatedAt)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "library not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, library)
}

//=========================================================================================================================================================================================
// Update
//=========================================================================================================================================================================================


func updateAppUserInfo(c *gin.Context) {
    var ID int
    id := c.Param("id")
    var updateAppUserInfo AppUser

    if err := c.ShouldBindJSON(&updateAppUserInfo); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    
    err := db.QueryRow(
        `UPDATE AppUser
         SET user_name = $1, phone = $2, email =$3, password = $4
         WHERE user_id = $5
         RETURNING user_id`,
        updateAppUserInfo.UserName, updateAppUserInfo.Phone, updateAppUserInfo.Email, updateAppUserInfo.Password, id,
    ).Scan(&ID)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    updateAppUserInfo.UserID = ID
	c.JSON(http.StatusOK, updateAppUserInfo)
}

func updateGame(c *gin.Context) {
    idParam := c.Param("id")
    id, err := strconv.Atoi(idParam)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var updateGame Game
    if err := c.ShouldBindJSON(&updateGame); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var updatedAt time.Time
    err = db.QueryRow(
        `UPDATE Game
         SET game_name = $1, game_type = $2, icon = $3, company_id = $4, updated_at = NOW()
         WHERE game_id = $5
         RETURNING updated_at`,
        updateGame.GameName, updateGame.GameType, updateGame.Icon, updateGame.CompanyID , id,
    ).Scan(&updatedAt)

    if err == sql.ErrNoRows {
        c.JSON(http.StatusNotFound, gin.H{"error": "Game not found"})
        return
    } else if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    updateGame.GameID = id
    updateGame.UpdatedAt = updatedAt
    c.JSON(http.StatusOK, updateGame)
}

//=========================================================================================================================================================================================
// Create
//=========================================================================================================================================================================================


func createAppUser(c *gin.Context) {
    var newAppUser AppUser

    if err := c.ShouldBindJSON(&newAppUser); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var id int
    var payment_date time.Time
   
    err := db.QueryRow(
        `INSERT INTO app_user (library_id, user_name, phone, email, password)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING user_id, payment_date`,
        newAppUser.LibraryID, newAppUser.UserName, newAppUser.Phone, newAppUser.Email, newAppUser.Password,
    ).Scan(&id, &payment_date)

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    newAppUser.UserID = id
    newAppUser.PaymentDate = payment_date


    c.JSON(http.StatusCreated, newAppUser)
}


func createGame(c *gin.Context) {
    var newGame Game

    if err := c.ShouldBindJSON(&newGame); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    var game_id  int
    var createdAt, updatedAt time.Time

    err := db.QueryRow(
        `INSERT INTO Game (game_name, game_type, icon, company_id)
         VALUES ($1, $2, $3, $4)
         RETURNING game_id, created_at, icon, updated_at`,
        newGame.GameName, newGame.GameType, newGame.Icon, newGame.CompanyID,
    ).Scan(&game_id, &createdAt, &updatedAt)

    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    newGame.GameID = game_id
    newGame.CreatedAt = createdAt
    newGame.UpdatedAt = updatedAt

    c.JSON(http.StatusCreated, newGame) // ใช้ 201 Created
}

//=========================================================================================================================================================================================
// Delete
//=========================================================================================================================================================================================

func deleteGame(c *gin.Context) {
    id := c.Param("id")

    result, err := db.Exec("DELETE FROM game WHERE game_id = $1", id)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    if rowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"error": "Game not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Game deleted successfully"})
}




// @title           Simple API Example
// @version         1.0
// @description     This is a simple example of using Gin with Swagger.
// @host localhost:8080
// @host 127.0.0.1:8080
// @BasePath        /api/v1
func main(){
	initDB()
	defer db.Close()
    
	r := gin.Default()    
    

    //r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    r.Use(cors.New(cors.Config{
       AllowOrigins:     []string{
        "http://127.0.0.1",       // 80
        "http://localhost",       
        "http://127.0.0.1:3000", // 3000
        "http://localhost:3000",
        "http://localhost:8080",  // server port    
        "http://127.0.0.1:8080",
    },
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

	r.GET("/health", func(c *gin.Context) {
		err := db.Ping()
		if err != nil{
			c.JSON(http.StatusServiceUnavailable, gin.H{"message":"unhealty", "error":err})
			return
		}
		c.JSON(200, gin.H{"message": "healthy"})
	})

	api := r.Group("/api/v1")
	{
		api.GET("/users", getAllUser)
	 	api.GET("/user/:id", getAppUser)
	 	api.POST("/user", createAppUser)
	 	api.PUT("/user/:id", updateAppUserInfo)

        api.GET("/company/:id", getCompany)
        api.GET("/bill/:id", getBill)
        api.POST("/user/auth", getAppUserAuthen)
	 	//api.DELETE("/user/:id", deleteApplicant)
        //api.GET("/user/profile", getApplicantProfile)

        api.GET("/admin/:id", getAdmin)

        api.GET("/games", getAllGame)
	 	api.GET("/game/:id", getGame)
        api.PUT("/game/:id", updateGame)
	 	api.POST("/game", createGame)
	 	api.DELETE("/game/:id", deleteGame)
        
        api.GET("/library/:id", getLibrary)
   
        
    }
	r.Run(":8080")
}