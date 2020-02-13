package main

import (
	"flag"
	"github.com/csmith/simpic"
	"github.com/csmith/simpic/http"
	"github.com/csmith/simpic/storage"
	"github.com/jamiealquiza/envy"
	"log"
	"path"
)

var (
	port          = flag.Int("port", 8080, "the port to listen on")
	dataDir       = flag.String("path", "data", "the path to store data in")
	dsn           = flag.String("dsn", "", "the DSN to use to connect to the database")
	migrationPath = flag.String("migrations", "migrations", "file system path for the DB migration files")
)

func main() {
	envy.Parse("SIMPIC")
	flag.Parse()

	db, err := simpic.OpenDatabase(*dsn, *migrationPath)
	if err != nil {
		log.Fatalf("unable to connect to database: %v\n", err)
		return
	}

	driver := storage.DiskDriver{Path: *dataDir}

	thumbnailer := simpic.NewThumbnailer(driver, storage.DiskDriver{Path: path.Join(*dataDir, "thumbnails")}, 220)

	http.Start(
		db,
		thumbnailer,
		simpic.NewRetriever(db, driver),
		simpic.NewStorer(db, driver),
		*port)
}
